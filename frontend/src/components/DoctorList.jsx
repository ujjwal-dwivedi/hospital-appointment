const DoctorList = ({ doctors }) => {
    return (
        <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">All Doctors</h3>

            {doctors.length === 0 ? (
                <p className="text-gray-500 text-sm">No doctors added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Doctor ID</th>
                                <th className="px-4 py-3">Specialization</th>
                                <th className="px-4 py-3">Max Patients</th>
                                <th className="px-4 py-3">Current Appointments</th>
                                <th className="px-4 py-3 rounded-tr-lg">Slots Available</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {doctors.map((doc) => {
                                const slotsLeft = doc.maxDailyPatients - doc.currentAppointments;
                                return (
                                    <tr key={doc.doctorId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium text-gray-700">#{doc.doctorId}</td>
                                        <td className="px-4 py-3 text-gray-700">{doc.specialization}</td>
                                        <td className="px-4 py-3 text-gray-700">{doc.maxDailyPatients}</td>
                                        <td className="px-4 py-3 text-gray-700">{doc.currentAppointments}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${slotsLeft === 0
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-700'
                                                }`}>
                                                {slotsLeft === 0 ? 'Full' : `${slotsLeft} left`}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DoctorList;