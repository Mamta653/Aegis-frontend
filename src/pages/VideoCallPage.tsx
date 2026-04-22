import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

interface ConsultationRoom {
  id: number;
  dailyRoomUrl: string;
  patientToken: string;
  scheduledAt: string;
  doctor: { name: string; specialty: string; avatarUrl: string };
}

export default function VideoCallPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<ConsultationRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get(`/consultation/room/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoom(res.data);
    } catch {
      setError('Could not load consultation room.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">{error || 'Room not found'}</p>
          <button onClick={() => navigate('/consultations')} className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Join the call with patient token
  const callUrl = `${room.dailyRoomUrl}?t=${room.patientToken}`;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={room.doctor.avatarUrl}
            alt={room.doctor.name}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-white font-semibold text-sm">{room.doctor.name}</p>
            <p className="text-gray-400 text-xs">{room.doctor.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-green-400 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live
          </span>
          <button
            onClick={() => navigate('/consultations')}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Leave Call
          </button>
        </div>
      </div>

      {/* Video Call iframe */}
      <div className="flex-1">
        <iframe
          src={callUrl}
          allow="camera; microphone; fullscreen; display-capture"
          className="w-full h-full min-h-[calc(100vh-64px)]"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}