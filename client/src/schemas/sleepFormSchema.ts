import * as z from 'zod';

const nameValidationRegex = /^[\p{L}\p{M}'-]+(\s[\p{L}\p{M}'-]+)*$/u;

export const sleepFormSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Name is required')
        .max(100, 'Name cannot be longer than 100 characters')
        .regex(nameValidationRegex, 'Name contains invalid characters')
        .transform((val) => val.replace(/\s+/g, ' '))
        .refine((val) => val.trim().length > 0, 'Name cannot be empty or consist only of spaces'),
    email: z.string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .max(100, 'Email cannot be longer than 100 characters'),
    gender: z.enum(['Male', 'Female', 'Other']),
    duration: z.object({
        hours: z.number().min(0, 'Hours cannot be negative').max(24, 'Hours cannot exceed 24'),
        minutes: z.number().min(0, 'Minutes cannot be negative').max(59, 'Minutes cannot exceed 59'),
    }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format').
        refine((val) => {
            const date = new Date(val);
            const today = new Date();
            date.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return date <= today;
        }, 'Future dates are not allowed'),
});
