import { useState } from 'react';
import api from '../api/axios.js';

const AddDoctorForm = ({ onDoctorAdded }) => {
    const [form, setForm] = useState({ specialization: '', maxDailyPatients: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        setLoading(true);
        try {
            const res = await api.post('/doctors', form);
            setMessage(res.data.message);
            setForm({ specialization: '', maxDailyPatients: '' });
            onDoctorAdded();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add doctor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Doctor</h3>

            {message && (
                <div className="bg-green-50 text-green-700 border border-green-200 rounded px-4 py-2 mb-3 text-sm">
                    {message}
                </div>
            )}
            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded px-4 py-2 mb-3 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    required
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Max Daily Patients"
                    value={form.maxDailyPatients}
                    onChange={(e) => setForm({ ...form, maxDailyPatients: e.target.value })}
                    required
                    className="w-full sm:w-48 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                    {loading ? 'Adding...' : 'Add Doctor'}
                </button>
            </form>
        </div>
    );
};

export default AddDoctorForm;