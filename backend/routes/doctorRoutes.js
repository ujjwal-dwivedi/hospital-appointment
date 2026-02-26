import express from 'express';
import { addDoctor, getAllDoctors, bookAppointment } from '../controllers/doctorController.js';
import { protect, restrictTo } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), addDoctor);
router.get('/', protect, getAllDoctors);
router.post('/book', protect, restrictTo('patient'), bookAppointment);

export default router;