import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createSleepRecord } from '../api/sleepRecords';
import { sleepFormSchema } from '../schemas/sleepFormSchema';
import { SleepRecordFormData } from '../types';


const SleepForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SleepRecordFormData>({
        resolver: zodResolver(sleepFormSchema),
        defaultValues: {
            duration: { hours: 0, minutes: 0 },
            date: new Date().toISOString().split('T')[0]
        }
    });

    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const removeBanner = () => {
        setTimeout(() => {
            setSubmissionStatus(null);
        }, 3000);
    };

    const onSubmit: SubmitHandler<SleepRecordFormData> = async (data) => {
        try {
            const result = await createSleepRecord(data);
            console.log('Record created successfully:', result);
            setSubmissionStatus('success');
            reset();
            removeBanner();
        } catch (error) {
            console.error('Error creating sleep record:', error);
            setSubmissionStatus('error');
            removeBanner();
        }
    };

    return (
        <div className="max-w-md m-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name:</label>
                    <input
                        {...register('name')}
                        className="mt-1 block w-full rounded-md shadow-sm p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="mt-1 block w-full rounded-md shadow-sm p-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Gender:</label>
                    <select
                        {...register('gender')}
                        className="mt-1 block w-full rounded-md border-gray-800 shadow-sm p-2"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Duration:</label>
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Hours</label>
                            <input
                                type="number"
                                {...register('duration.hours', { valueAsNumber: true })}
                                className="mt-1 block w-full rounded-md border-gray-800 shadow-sm p-2"
                            />
                            {errors.duration?.hours && <p className="text-red-500 text-sm">{errors.duration.hours.message}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium">Minutes</label>
                            <input
                                type="number"
                                {...register('duration.minutes', { valueAsNumber: true })}
                                className="mt-1 block w-full rounded-md border-gray-800 shadow-sm p-2"
                            />
                            {errors.duration?.minutes && <p className="text-red-500 text-sm">{errors.duration.minutes.message}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Date:</label>
                    <input
                        type="date"
                        {...register('date')}
                        className="mt-1 block w-full rounded-md border-gray-800 shadow-sm p-2"
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Submit
                </button>
            </form>

            {submissionStatus === 'success' && (
                <div className="mt-4 text-white bg-green-500 p-3 rounded-md">
                    Sleep record submitted successfully!
                </div>
            )}

            {submissionStatus === 'error' && (
                <div className="mt-4 text-white bg-red-500 p-3 rounded-md">
                    There was an error submitting the sleep record. Please try again.
                </div>
            )}
        </div>
    );
};

export default SleepForm;
