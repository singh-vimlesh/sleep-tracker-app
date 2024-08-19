import { Request, Response } from 'express';
import { getAllUsersWithSubmissionCount } from '../services/userService';

export const getUsers = async (_req: Request, res: Response) => {
    const users = await getAllUsersWithSubmissionCount();
    res.json(users);
};
