import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, Loader2, ArrowRight, Sparkles } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data) => {
    setApiError('');
    setIsSubmitting(true);
    try {
      const res = await signup(data);
      if (res?.success) {
        navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      } else {
        setApiError(res?.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Something went wrong during signup.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-100">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mb-3 shadow-lg shadow-purple-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Join <span className="font-semibold text-purple-400">bubbu</span> today
          </p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Enter your name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters',
                  },
                })}
                className={`w-full bg-slate-950/60 border ${
                  errors.name ? 'border-red-500' : 'border-slate-800'
                } focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

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
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`w-full bg-slate-950/60 border ${
                  errors.password ? 'border-red-500' : 'border-slate-800'
                } focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Phone Number <span className="text-slate-600">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                {...register('phoneNumber')}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition"
              />
            </div>
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
                Continue to Verification <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 font-semibold transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
