import { useState } from 'react';
import api from '../api/axios.js';

const BookAppointmentForm = ({ onBooked }) => {
    const [specialization, setSpecialization] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null); setError('');
        setLoading(true);
        try {
            const res = await api.post('/doctors/book', { specialization });
            setResult(res.data);
            setSpecialization('');
            onBooked();
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Book Appointment</h3>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Enter specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                    {loading ? 'Booking...' : 'Book Now'}
                </button>
            </form>

            {result && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 font-semibold mb-2">{result.message}</p>
                    <div className="text-sm text-green-800 space-y-1">
                        <p><span className="font-medium">Doctor ID:</span> #{result.doctor.doctorId}</p>
                        <p><span className="font-medium">Specialization:</span> {result.doctor.specialization}</p>
                        <p><span className="font-medium">Current Appointments:</span> {result.doctor.currentAppointments} / {result.doctor.maxDailyPatients}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}
        </div>
    );
};

export default BookAppointmentForm;