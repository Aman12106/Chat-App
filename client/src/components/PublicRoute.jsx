import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-2" />
        <p className="text-slate-400 text-sm font-medium">Loading bubbu...</p>
      </div>
    );
  }

  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
