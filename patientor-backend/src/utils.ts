import { NewPatient, Gender } from "./types";
import { z } from 'zod';

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

const ToNewPatientEntry = (object: unknown): NewPatient => {
  return newEntrySchema.parse(object);
};

export default ToNewPatientEntry;