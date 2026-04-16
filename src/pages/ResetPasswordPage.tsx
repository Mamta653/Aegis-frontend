import { Lock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

// ─── This page lives at /reset-password?token=<TOKEN> ───────────
// The user arrives here by clicking the link in their email.

type PageState = 'form' | 'success' | 'error';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Grab the token from the URL: /reset-password?token=abc123...
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState<PageState>('form');
  const [errorMsg, setErrorMsg] = useState('');

  // If someone lands here without a token, show error immediately
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <XCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Invalid Link</h2>
          <p className="text-black/60 mb-6">
            This reset link is missing a token. Please request a new one.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    // Basic frontend validation
    if (!newPassword || !confirmPassword) {
      setErrorMsg('Please fill in both fields.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      // POST /auth/reset-password  { token, newPassword }
      await API.post('/auth/reset-password', { token, newPassword });
      setPageState('success');
    } catch (error: unknown) {
      let msg = 'Something went wrong. The link may have expired.';
      if (error && typeof error === 'object' && 'response' in error) {
        const e = error as { response: { data: { message?: string } } };
        msg = e.response?.data?.message || msg;
      }
      setErrorMsg(msg);
      setPageState('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full">

        {/* ── FORM STATE ── */}
        {pageState === 'form' && (
          <>
            <div className="mb-8">
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-2">New Password</h2>
              <p className="text-black/60">
                Choose a strong password. You won't be able to reuse this link after.
              </p>
            </div>

            <div className="space-y-4">
              {/* New password input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  type="password"
                  placeholder="New password (min. 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              {/* Confirm password input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#E9EFEC] rounded-xl outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>

              {/* Inline error message */}
              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 disabled:bg-gray-400 transition-all active:scale-[0.98]"
              >
                {loading ? 'Saving...' : 'Reset Password'}
              </button>
            </div>
          </>
        )}

        {/* ── SUCCESS STATE ── */}
        {pageState === 'success' && (
          <div className="text-center py-4 animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">Password Updated!</h2>
            <p className="text-black/60 mb-8">
              Your password has been changed successfully. You can now sign in with your new password.
            </p>
            <button
              onClick={() => navigate('/')} // go home — user can open login modal
              className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all"
            >
              Go to Sign In
            </button>
          </div>
        )}

        {/* ── ERROR STATE (expired/invalid token) ── */}
        {pageState === 'error' && (
          <div className="text-center py-4 animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">Link Expired</h2>
            <p className="text-black/60 mb-8">{errorMsg}</p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all"
            >
              Request New Link
            </button>
          </div>
        )}

      </div>
    </div>
  );
}