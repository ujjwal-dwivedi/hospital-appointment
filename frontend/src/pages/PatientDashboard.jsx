import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import BookAppointmentForm from '../components/BookAppointmentForm.jsx';
import DoctorList from '../components/DoctorList.jsx';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Dashboard</h2>
        <BookAppointmentForm onBooked={fetchDoctors} />
        <DoctorList doctors={doctors} />
      </div>
    </div>
  );
};

export default PatientDashboard;