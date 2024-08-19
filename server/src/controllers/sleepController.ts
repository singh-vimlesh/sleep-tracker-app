import { Request, Response } from 'express';
import { createOrUpdateSleepRecord, getLast7DaysSleepData } from '../services/sleepService';
import { getUserByEmail, createUser, getUserById, updateUser } from '../services/userService';

export const addSleepRecord = async (req: Request, res: Response) => {
  const { email, name, gender, date, duration } = req.body;

  const parsedDuration = {
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
  };

  let user = await getUserByEmail(email);
  let userNeedsUpdate = false;
  let updatedFields: { gender?: string; name?: string } = {};

  if (user) {
    if (user.gender !== gender) {
      updatedFields.gender = gender;
      userNeedsUpdate = true;
    }
    if (user.name !== name) {
      updatedFields.name = name;
      userNeedsUpdate = true;
    }

    if (userNeedsUpdate) {
      await updateUser(email, updatedFields);
    }
  } else {
    user = await createUser(name, gender, email);
  }

  const sleepRecord = await createOrUpdateSleepRecord(user.id, new Date(date), parsedDuration);
  res.status(201).json(sleepRecord);
};


export const getSleepDataForUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const sleepData = await getLast7DaysSleepData(user.id);
  res.json(sleepData);
};
