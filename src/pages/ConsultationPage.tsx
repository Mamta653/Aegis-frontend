import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Video } from 'lucide-react';
import API from '../api/axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
}

const specialties = ['All', 'General Physician', 'Cardiologist', 'Dermatologist', 'Psychiatrist'];

const doctorExtras: Record<number, { rating: number; reviews: number; wait: string; experience: string }> = {
  1: { rating: 4.9, reviews: 128, wait: '~5 min', experience: '10 years' },
  2: { rating: 4.8, reviews: 94,  wait: '~10 min', experience: '15 years' },
  3: { rating: 4.7, reviews: 76,  wait: '~3 min', experience: '8 years' },
  4: { rating: 4.9, reviews: 112, wait: '~7 min', experience: '12 years' },
};

export default function ConsultationPage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [scheduledAt, setScheduledAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => { fetchDoctors(); }, []);

  useEffect(() => {
    let result = doctors;
    if (search) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeSpecialty !== 'All') {
      result = result.filter(d => d.specialty === activeSpecialty);
    }
    setFiltered(result);
  }, [search, activeSpecialty, doctors]);

  const fetchDoctors = async () => {
    try {
      const res = await API.get('/consultation/doctors');
      setDoctors(res.data);
      setFiltered(res.data);
    } catch {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (doctor: Doctor) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please sign in to book a consultation');
      return;
    }
    setSelectedDoctor(doctor);
    setShowModal(true);
    setError('');
  };

  const handleBooking = async () => {
    if (!scheduledAt) { setError('Please select a date and time'); return; }
    setBooking(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/consultation/book',
        { doctorId: selectedDoctor?.id, scheduledAt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      navigate(`/consultation/${res.data.id}`);
    } catch {
      setError('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4" />
          <p className="text-black/50">Loading specialists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Header ── */}
      <div className="bg-black text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-white/50 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors"
          >
            ← Back to Home
          </button>
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Virtual Consultations</h1>
              <p className="text-white/60 text-lg">Connect with top specialists from the comfort of your home</p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-white/50 text-sm">Specialists</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-white/50 text-sm">Avg Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-white/50 text-sm">Available</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white text-black rounded-2xl outline-none shadow-lg text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Specialty Filter ── */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeSpecialty === s
                  ? 'bg-black text-white shadow-md scale-105'
                  : 'bg-white text-black/60 hover:bg-black hover:text-white border border-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── Results Count ── */}
        <p className="text-black/40 text-sm mb-6">
          Showing <span className="font-semibold text-black">{filtered.length}</span> specialists
          {activeSpecialty !== 'All' && ` in ${activeSpecialty}`}
        </p>

        {/* ── Doctors Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-black/40 text-lg">No doctors found for "{search}"</p>
            <button onClick={() => { setSearch(''); setActiveSpecialty('All'); }}
              className="mt-4 text-black font-semibold underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((doctor) => {
              const extra = doctorExtras[doctor.id] || { rating: 4.8, reviews: 80, wait: '~5 min', experience: '8 years' };
              const isHovered = hoveredCard === doctor.id;
              return (
                <div
                  key={doctor.id}
                  onMouseEnter={() => setHoveredCard(doctor.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isHovered ? 'shadow-xl border-black/10 -translate-y-1' : 'shadow-sm border-gray-100'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex gap-4 mb-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={doctor.avatarUrl}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-black truncate">{doctor.name}</h3>
                          <span className="flex items-center gap-1 text-sm font-semibold text-amber-500 flex-shrink-0">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            {extra.rating}
                          </span>
                        </div>
                        <span className="inline-block bg-black/5 text-black text-xs px-3 py-1 rounded-full mt-1 font-medium">
                          {doctor.specialty}
                        </span>
                        <p className="text-black/50 text-xs mt-1">{extra.reviews} reviews · {extra.experience} exp.</p>
                      </div>
                    </div>

                    <p className="text-black/60 text-sm mb-4 leading-relaxed">{doctor.bio}</p>

                    {/* Stats Row */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-500 mb-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">Wait</span>
                        </div>
                        <p className="text-sm font-bold text-black">{extra.wait}</p>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-0.5">
                          <Video className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">Mode</span>
                        </div>
                        <p className="text-sm font-bold text-black">Video</p>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-purple-500 mb-0.5">
                          <Star className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">Exp</span>
                        </div>
                        <p className="text-sm font-bold text-black">{extra.experience}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookClick(doctor)}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isHovered
                          ? 'bg-black text-white scale-[1.02] shadow-lg'
                          : 'bg-black/5 text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Book Video Consultation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Booking Modal ── */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedDoctor.avatarUrl}
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-black">{selectedDoctor.name}</h2>
                <p className="text-black/50 text-sm">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-500">
                    {doctorExtras[selectedDoctor.id]?.rating || 4.8}
                  </span>
                  <span className="text-xs text-black/30 ml-1">
                    ({doctorExtras[selectedDoctor.id]?.reviews || 80} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-green-700 text-sm font-medium">
                Available now · Est. wait {doctorExtras[selectedDoctor.id]?.wait || '~5 min'}
              </p>
            </div>

            <label className="block text-sm font-semibold text-black mb-2">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-black/10 mb-2 text-black border border-gray-100"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleBooking}
              disabled={booking}
              className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 disabled:bg-gray-300 transition-all mt-4 flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              {booking ? 'Booking...' : 'Confirm & Join Consultation'}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 mt-2 text-black/40 hover:text-black transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}