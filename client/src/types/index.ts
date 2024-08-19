import { z } from "zod";
import { sleepFormSchema } from "../schemas/sleepFormSchema";

export type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  submissions: number;
}

export type SleepDuration = {
  hours: number;
  minutes: number;
}

export type SleepRecord = {
  date: string;
  duration: SleepDuration;
}

export type SleepRecordFormData = z.infer<typeof sleepFormSchema>;

export type SleepRecordAddRequestData = SleepRecordFormData;
