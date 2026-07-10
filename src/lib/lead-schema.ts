import { z } from "zod";

export const drivingExperienceOptions = [
  "No circuit experience",
  "Road sports car experience",
  "Track-day experience",
  "Karting",
  "Club racing",
  "National racing",
  "International racing",
] as const;

export const objectiveOptions = [
  "First race car test",
  "Private test day",
  "Driver development",
  "Race weekend",
  "Full season",
  "Corporate or VIP event",
  "Other",
] as const;

export const budgetOptions = [
  "To be discussed",
  "Under €5,000",
  "€5,000–€10,000",
  "€10,000–€25,000",
  "€25,000+",
  "Full-season budget",
] as const;

export const languageOptions = ["English", "French", "German"] as const;

export const leadSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.email(),
  phone: z.string().trim().min(1),
  country: z.string().trim().min(1),
  preferredLanguage: z.enum(languageOptions),
  drivingExperience: z.enum(drivingExperienceOptions),
  racingLicence: z.string().trim().min(1),
  objective: z.enum(objectiveOptions),
  circuit: z.string().trim().optional(),
  dates: z.string().trim().optional(),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  height: z.string().trim().optional(),
  weight: z.string().trim().optional(),
  message: z.string().trim().min(1),
  privacyConsent: z.boolean().refine((value) => value),
  companyWebsite: z.string().max(0).optional(),
});

export type LeadFormInput = z.infer<typeof leadSchema>;
