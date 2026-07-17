import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { reservationAPI } from '../../services/api';

export default function ReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await reservationAPI.getAll();
      setReservations(data);
    } catch (err) {
      setError('Error loading reservations: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await reservationAPI.updateStatus(id, 'Confirmed');
      if (response.success) {
        setReservations(reservations.map(res =>
          res._id === id ? { ...res, status: 'Confirmed' } : res
        ));
      }
    } catch (err) {
      setError('Error updating reservation: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await reservationAPI.delete(id);
      if (response.success) {
        setReservations(reservations.filter(res => res._id !== id));
      }
    } catch (err) {
      setError('Error deleting reservation: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading reservations...</div>;

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Time</th>
              <th className="px-6 py-3 text-left font-semibold">Guests</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{res.name}</td>
                <td className="px-6 py-3">{res.phone}</td>
                <td className="px-6 py-3">{new Date(res.date).toLocaleDateString()}</td>
                <td className="px-6 py-3">{res.time}</td>
                <td className="px-6 py-3">{res.guests}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    res.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : res.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {res.status}
                  </span>
                </td>
                <td className="px-6 py-3 flex gap-2">
                  {res.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(res._id)}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(res._id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}