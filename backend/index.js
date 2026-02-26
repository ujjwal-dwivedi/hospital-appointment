import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://hospital-appointment-six-xi.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hospital Scheduler API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});