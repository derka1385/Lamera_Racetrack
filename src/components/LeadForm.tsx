"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Dictionary } from "@/content/dictionaries";
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
};

export function LeadForm({ dictionary }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      preferredLanguage: "English",
      drivingExperience: "Track-day experience",
      objective: "Private test day",
      budget: "",
      privacyConsent: false,
      companyWebsite: "",
    },
  });

  async function onSubmit(values: LeadFormInput) {
    setStatus("idle");

    if (isStaticExport) {
      window.location.assign(`mailto:${process.env.NEXT_PUBLIC_ENQUIRY_EMAIL ?? "contact@racetrack-competition.example"}?subject=${encodeURIComponent(`RaceTrack Competition enquiry - ${values.objective}`)}&body=${encodeURIComponent(
        [
          `Name: ${values.firstName} ${values.lastName}`,
          `Email: ${values.email}`,
          `Phone / WhatsApp: ${values.phone}`,
          `Country: ${values.country}`,
          `Preferred language: ${values.preferredLanguage}`,
          `Driving experience: ${values.drivingExperience}`,
          `Racing licence: ${values.racingLicence}`,
          `Objective: ${values.objective}`,
          `Preferred circuit: ${values.circuit ?? ""}`,
          `Preferred dates: ${values.dates ?? ""}`,
          `Approximate budget: ${values.budget ?? ""}`,
          `Height: ${values.height ?? ""}`,
          `Weight: ${values.weight ?? ""}`,
          "",
          values.message,
        ].join("\n"),
      )}`);
      setStatus("success");
      reset();
      return;
    }

    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  }

  const inputClass =
    "min-h-12 rounded border border-white/12 bg-black/35 px-3 text-foreground outline-none focus:border-brand";
  const labelClass = "grid gap-2 text-sm font-medium text-foreground";
  const errorClass = "text-sm text-[var(--color-warning)]";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded border border-white/10 bg-surface p-5 shadow-[var(--shadow-elevated)] md:p-8"
      noValidate
    >
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
          <p className="rounded border border-brand/30 bg-brand/10 p-4 text-sm text-brand">
            {dictionary.form.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 p-4 text-sm text-[var(--color-warning)]">
            {dictionary.form.failure}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold uppercase text-[var(--color-brand-ink)] hover:bg-[var(--color-brand-hover)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
      >
        {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : null}
        {isSubmitting ? dictionary.form.sending : dictionary.form.submit}
      </button>
    </form>
  );
}
