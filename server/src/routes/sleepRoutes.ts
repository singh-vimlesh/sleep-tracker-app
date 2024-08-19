import express from 'express';
import { addSleepRecord, getSleepDataForUser } from '../controllers/sleepController';

const router = express.Router();

router.post('/', addSleepRecord);
router.get('/:id', getSleepDataForUser);

export default router;
