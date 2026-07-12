"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  budgetOptions,
  drivingExperienceOptions,
  languageOptions,
  leadSchema,
  objectiveOptions,
  type LeadFormInput,
} from "@/lib/lead-schema";

type LeadFormProps = {
  dictionary: Dictionary;
  locale: Locale;
};

type SubmissionStatus = "idle" | "success" | "error" | "configuration";

const objectiveByParam: Record<string, LeadFormInput["objective"]> = {
  "first-test": "First race car test",
  "private-test": "Private test day",
  "private-testing": "Private test day",
  coaching: "Driver development",
  "driver-development": "Driver development",
  "race-weekend": "Race weekend",
  "race-seat": "Race weekend",
  "full-season": "Full season",
  corporate: "Corporate or VIP event",
  vip: "Corporate or VIP event",
};

const circuitByParam: Record<string, string> = {
  "paul-ricard": "Circuit Paul Ricard",
  "magny-cours": "Magny-Cours",
  portimao: "Portimão",
  "dijon-prenois": "Dijon-Prenois",
  dijon: "Dijon-Prenois",
  zolder: "Zolder",
  aragon: "MotorLand Aragón",
  mugello: "Mugello",
};

const preferredLanguageByLocale: Record<Locale, LeadFormInput["preferredLanguage"]> = {
  en: "English",
  fr: "French",
  de: "German",
};

function getInitialValues(locale: Locale, params: URLSearchParams): LeadFormInput {
  const objectiveParam = params.get("objective") ?? "";
  const circuitParam = params.get("circuit") ?? "";
  const eventParam = params.get("event") ?? "";
  const programmeParam = params.get("programme") ?? "";
  const messageLines = [
    eventParam ? `Event: ${eventParam}` : "",
    programmeParam ? `Programme: ${programmeParam}` : "",
  ].filter(Boolean);

  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    preferredLanguage: preferredLanguageByLocale[locale],
    drivingExperience: "Track-day experience",
    racingLicence: "",
    objective: objectiveByParam[objectiveParam] ?? "Private test day",
    circuit: circuitByParam[circuitParam] ?? circuitParam,
    dates: params.get("dates") ?? "",
    budget: "",
    height: "",
    weight: "",
    message: messageLines.join("\n"),
    privacyConsent: false,
    companyWebsite: "",
  };
}

function trackingParams(params: URLSearchParams) {
  return Object.fromEntries(
    Array.from(params.entries()).filter(([key]) => key.startsWith("utm_")),
  );
}

export function LeadForm({ dictionary, locale }: LeadFormProps) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();
  const params = useMemo(() => new URLSearchParams(paramsKey), [paramsKey]);
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();
  const directEmail = process.env.NEXT_PUBLIC_DIRECT_EMAIL?.trim();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  const initialValues = useMemo(() => getInitialValues(locale, params), [locale, params]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues, { keepDirtyValues: true, keepErrors: true });
  }, [initialValues, reset]);

  async function onSubmit(values: LeadFormInput) {
    setStatus("idle");

    if (values.companyWebsite) {
      return;
    }

    if (!endpoint) {
      setStatus("configuration");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          technical: {
            locale,
            originPage: pathname,
            fullUrl: window.location.href,
            requestedAt: new Date().toISOString(),
            utm: trackingParams(params),
            requestedObjective: params.get("objective") ?? "",
            requestedProgramme: params.get("programme") ?? "",
            requestedCircuit: params.get("circuit") ?? "",
            requestedEvent: params.get("event") ?? "",
          },
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      reset(getInitialValues(locale, params));
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "min-h-12 min-w-0 rounded border border-white/12 bg-black/35 px-3 text-foreground outline-none focus:border-brand";
  const labelClass = "grid min-w-0 gap-2 text-sm font-medium text-foreground";
  const errorClass = "text-sm text-[var(--color-warning)]";
  const showFallback = status === "error" || status === "configuration";

  return (
    <form
      data-lead-form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded border border-white/10 bg-surface p-5 shadow-[var(--shadow-elevated)] md:p-8"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} readOnly />
      <input type="hidden" name="originPage" value={pathname} readOnly />
      <input type="hidden" name="utm" value={JSON.stringify(trackingParams(params))} readOnly />
      <input type="hidden" name="requestedObjective" value={params.get("objective") ?? ""} readOnly />
      <input type="hidden" name="requestedCircuit" value={params.get("circuit") ?? ""} readOnly />
      <input type="hidden" name="requestedProgramme" value={params.get("programme") ?? ""} readOnly />
      <input type="hidden" name="requestedEvent" value={params.get("event") ?? ""} readOnly />

      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          {dictionary.form.firstName}
          <input className={inputClass} autoComplete="given-name" {...register("firstName")} />
          {errors.firstName ? <span className={errorClass}>{dictionary.form.required}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.lastName}
          <input className={inputClass} autoComplete="family-name" {...register("lastName")} />
          {errors.lastName ? <span className={errorClass}>{dictionary.form.required}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.email}
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
          {errors.email ? <span className={errorClass}>{dictionary.form.invalidEmail}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.phone}
          <input className={inputClass} type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone ? <span className={errorClass}>{dictionary.form.required}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.country}
          <input className={inputClass} autoComplete="country-name" {...register("country")} />
          {errors.country ? <span className={errorClass}>{dictionary.form.required}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.preferredLanguage}
          <select className={inputClass} {...register("preferredLanguage")}>
            {languageOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {dictionary.form.drivingExperience}
          <select className={inputClass} {...register("drivingExperience")}>
            {drivingExperienceOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {dictionary.form.racingLicence}
          <input className={inputClass} {...register("racingLicence")} />
          {errors.racingLicence ? <span className={errorClass}>{dictionary.form.required}</span> : null}
        </label>
        <label className={labelClass}>
          {dictionary.form.objective}
          <select className={inputClass} {...register("objective")}>
            {objectiveOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {dictionary.form.circuit}
          <input className={inputClass} {...register("circuit")} />
        </label>
        <label className={labelClass}>
          {dictionary.form.dates}
          <input className={inputClass} {...register("dates")} />
        </label>
        <label className={labelClass}>
          {dictionary.form.budget}
          <select className={inputClass} {...register("budget")}>
            <option value="" className="bg-surface">
              -
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {dictionary.form.height}
          <input className={inputClass} {...register("height")} />
        </label>
        <label className={labelClass}>
          {dictionary.form.weight}
          <input className={inputClass} {...register("weight")} />
        </label>
      </div>

      <label className={`${labelClass} mt-5`}>
        {dictionary.form.message}
        <textarea className={`${inputClass} min-h-32 py-3`} {...register("message")} />
        {errors.message ? <span className={errorClass}>{dictionary.form.required}</span> : null}
      </label>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-muted">
        <input type="checkbox" className="mt-1 h-5 w-5 accent-[var(--color-brand)]" {...register("privacyConsent")} />
        <span>{dictionary.form.consent}</span>
      </label>
      {errors.privacyConsent ? (
        <p className={errorClass} role="alert">{dictionary.form.consentRequired}</p>
      ) : null}

      <label className="hidden" aria-hidden="true">
        Website
        <input tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
      </label>

      <div aria-live="polite" className="mt-5">
        {status === "success" ? (
          <p className="flex items-start gap-3 rounded border border-brand/30 bg-brand/10 p-4 text-sm text-brand">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
            {dictionary.form.success}
          </p>
        ) : null}
        {showFallback ? (
          <div className="rounded border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 p-4 text-sm text-[var(--color-warning)]">
            <p>{status === "configuration" ? dictionary.form.missingEndpoint : dictionary.form.failure}</p>
            <p className="mt-2">{dictionary.form.fallback}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {directEmail ? (
                <a className="rounded border border-current px-3 py-2" href={`mailto:${directEmail}`}>
                  {dictionary.common.directEmail}
                </a>
              ) : null}
              {whatsappUrl ? (
                <a className="rounded border border-current px-3 py-2" href={whatsappUrl} rel="noreferrer" target="_blank">
                  {dictionary.common.whatsapp}
                </a>
              ) : null}
            </div>
            {!directEmail && !whatsappUrl ? (
              <p className="mt-3">{dictionary.common.contactDetailsMissing}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-center text-sm font-semibold uppercase text-[var(--color-brand-ink)] hover:bg-[var(--color-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
      >
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : null}
        {status === "success" ? dictionary.form.sent : isSubmitting ? dictionary.form.sending : dictionary.form.submit}
      </button>
    </form>
  );
}
