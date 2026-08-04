import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, Mail, Loader2, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

const VerifyOtp = () => {
  const { verifyOtp, sendOtp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: initialEmail,
      otp: '',
    },
  });

  const onSubmit = async (data) => {
    setApiError('');
    setApiSuccess('');
    setIsSubmitting(true);
    try {
      const res = await verifyOtp(data.email, data.otp);
      if (res?.success) {
        navigate('/dashboard');
      } else {
        setApiError(res?.message || 'Verification failed. Please check the OTP.');
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Invalid or expired OTP. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    const email = getValues('email');
    if (!email) {
      setApiError('Please enter a valid email address to resend OTP.');
      return;
    }

    setApiError('');
    setApiSuccess('');
    setIsResending(true);

    try {
      const res = await sendOtp(email);
      if (res?.success) {
        setApiSuccess(res?.message || 'A new OTP has been sent to your email.');
      } else {
        setApiError(res?.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-100">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mb-3 shadow-lg shadow-purple-500/30">
            <KeyRound className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Verify Email
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            {apiError}
          </div>
        )}

        {apiSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            {apiSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full bg-slate-950/60 border ${
                  errors.email ? 'border-red-500' : 'border-slate-800'
                } focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              OTP Code (6 digits)
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                {...register('otp', {
                  required: 'OTP code is required',
                  length: {
                    value: 6,
                    message: 'OTP must be exactly 6 digits',
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'OTP must contain only numbers',
                  },
                })}
                className={`w-full bg-slate-950/60 border tracking-widest font-mono text-lg text-center ${
                  errors.otp ? 'border-red-500' : 'border-slate-800'
                } focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition`}
              />
            </div>
            {errors.otp && (
              <p className="text-xs text-red-400 mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-purple-600/25 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Verify & Log In <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="text-slate-400 hover:text-purple-400 flex items-center gap-1.5 transition font-medium text-xs disabled:opacity-50"
          >
            {isResending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Resend OTP
          </button>

          <Link
            to="/login"
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
