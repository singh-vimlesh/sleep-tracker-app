import { SleepRecord, SleepRecordAddRequestData } from '../types';
import { API_BASE_URL } from '../utils/constants';

export const fetchSleepData = async (userId: string): Promise<SleepRecord[]> => {
  const response = await fetch(`${API_BASE_URL}/sleep-records/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sleep data");
  }
  return response.json();
};


export const createSleepRecord = async (data: SleepRecordAddRequestData) => {
  const response = await fetch(`${API_BASE_URL}/sleep-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create sleep record");
  }

  return response.json();
};
