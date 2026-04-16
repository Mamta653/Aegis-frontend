import { X, Mail, Lock, User, Phone, Calendar, UserCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import API from '../api/axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

// ✅ Added 'forgot' as a view state
type ModalView = 'login' | 'signup' | 'forgot' | 'forgot-success';

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [view, setView] = useState<ModalView>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [forgotEmail, setForgotEmail] = useState(''); // ✅ separate email for forgot

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = view === 'login' ? '/auth/signin' : '/auth/signup';
      const payload = view === 'login'
        ? { email: email.trim(), password }
        : {
            email: email.trim(),
            password,
            name: name.trim(),
            phone: phone.trim(),
            age: age ? parseInt(age, 10) : 0,
            gender,
          };

      const response = await API.post(endpoint, payload);

      if (view === 'login') {
        localStorage.setItem('token', response.data.access_token);
        onLogin();
        onClose();
      } else {
        alert("Account created! Please sign in.");
        setView('login');
      }
    } catch (error: unknown) {
      let errorMsg = "Connection failed";
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: { message?: string | string[] } } };
        const data = axiosError.response?.data?.message;
        errorMsg = Array.isArray(data) ? data[0] : data || errorMsg;
      }
      console.error("Auth Error:", error);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email: forgotEmail.trim() });
      setView('forgot-success');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="relative p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-black" />
          </button>

          {/* ── FORGOT PASSWORD FORM ── */}
          {view === 'forgot' && (
            <>
              <div className="mb-8">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">Forgot Password</h2>
                <p className="text-black/60">Enter your email and we'll send you a reset link.</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 disabled:bg-gray-400 transition-all"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="w-full py-2 text-sm text-black/60 hover:text-black transition-all"
                >
                  ← Back to Sign In
                </button>
              </form>
            </>
          )}

          {/* ── FORGOT SUCCESS ── */}
          {view === 'forgot-success' && (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-3">Check Your Email</h2>
              <p className="text-black/60 mb-8">
                We sent a password reset link to <strong>{forgotEmail}</strong>. Check your inbox!
              </p>
              <button
                onClick={() => { setView('login'); setForgotEmail(''); }}
                className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* ── LOGIN / SIGNUP FORM ── */}
          {(view === 'login' || view === 'signup') && (
            <>
              <div className="mb-8">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">{view === 'login' ? "Welcome Back" : "Create Account"}</h2>
                <p className="text-black/60">{view === 'login' ? "Sign in to access your agents" : "Join us to start your AI journey"}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'signup' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                      <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                        <input type="number" placeholder="Age" required value={age} onChange={(e) => setAge(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5" />
                      </div>
                      <div className="relative">
                        <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                        <select required value={gender} onChange={(e) => setGender(e.target.value)}
                          className={`w-full pl-12 pr-10 py-3.5 bg-[#E9EFEC] rounded-xl outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-black/5 ${gender ? 'text-black' : 'text-black/40'}`}>
                          <option value="" disabled>Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5" />
                </div>

                {/* ✅ Forgot password now switches to forgot view */}
                {view === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-sm text-black font-medium hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 disabled:bg-gray-400 transition-all active:scale-[0.98]">
                  {loading ? "Processing..." : (view === 'login' ? "Sign In" : "Sign Up")}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-black/60">
                  {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                    className="text-black font-semibold hover:underline transition-all">
                    {view === 'login' ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}