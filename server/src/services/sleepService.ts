import prisma from '../prisma';
import { z } from 'zod';

const sleepRecordSchema = z.object({
  userId: z.string(),
  date: z.date(),
  duration: z.object({
    hours: z.number().min(0).max(24),
    minutes: z.number().min(0).max(59),
  }),
});

export const createOrUpdateSleepRecord = async (userId: string, date: Date, duration: { hours: number; minutes: number }) => {
  const validation = sleepRecordSchema.safeParse({ userId, date, duration });

  if (!validation.success) {
    throw new Error('Invalid sleep record. Duration must be a valid object with hours and minutes.');
  }

  const existingRecord = await prisma.sleepRecord.findFirst({
    where: {
      userId,
      date: date,
    },
  });

  const durationJson = JSON.stringify(duration);

  if (existingRecord) {
    return prisma.sleepRecord.update({
      where: { id: existingRecord.id },
      data: { duration: durationJson },
    });
  } else {
    return prisma.sleepRecord.create({
      data: {
        userId,
        date,
        duration: durationJson,
      },
    });
  }
};

export const getLast7DaysSleepData = async (userId: string) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const sleepRecords = await prisma.sleepRecord.findMany({
    where: {
      userId,
      date: {
        gte: sevenDaysAgo,
        lte: today,
      },
    },
    orderBy: {
      date: 'asc',
    },
    select: {
      id: true,
      date: true,
      duration: true,
      userId: true,
    }
  });

  const last7Days: string[] = [];

  for (let i = 1; i < 8; i++) {
    const date = new Date();
    date.setDate(sevenDaysAgo.getDate() + i);
    last7Days.push(date.toISOString().split('T')[0]);
  }

  const sleepRecordMap = sleepRecords.reduce((map: { [date: string]: { hours: number, minutes: number } }, record) => {
    const dateStr = record.date.toISOString().split('T')[0];
    const duration = JSON.parse(record.duration as string);

    map[dateStr] = duration;
    return map;
  }, {} as { [date: string]: { hours: number, minutes: number } });

  const finalSleepData = last7Days.map(date => {
    const duration = sleepRecordMap[date] || { hours: 0, minutes: 0 };
    return {
      date,
      duration,
    };
  });

  return finalSleepData;
};