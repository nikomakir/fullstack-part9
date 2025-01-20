import { NewPatient, Gender } from "./types";
import { z } from 'zod';

const baseSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const healthCheckEntrySchema = baseSchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3),
});

const hospitalEntrySchema = baseSchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

const occupationalHealthcareEntrySchema = baseSchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

const entrySchema = z.union([
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(entrySchema).optional()
});

const ToNewPatientEntry = (object: unknown): NewPatient => {
  const parsedPatient = newEntrySchema.parse(object);
  return {
    ...parsedPatient,
    entries: parsedPatient.entries || []
  };
};

export default ToNewPatientEntry;