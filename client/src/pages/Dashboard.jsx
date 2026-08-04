import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, MessageSquare, User, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useSocket } from '../context/socketStore';
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
const {socket,connectSocket }= useSocket()
const [data,setdata] = useState("");
useEffect(()=>{
  if(!socket){
    connectSocket();
  }
},[])

useEffect(()=>{
  if(socket && user?._id){
    socket.emit("join", user._id);
  }
},[socket])



  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  const handleSend=()=>{
    console.log("send kdmfkwejvedo",data)
    console.log(socket)
    socket.emit('message',data)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
              bubbu
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{user?.name || user?.email || 'User'}</span>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-2xl text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-2">
           
            <span>Welcome to the Chat App</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter bg-gradient-to-b from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            bubbu
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            Simple, fast, and secure messaging. Your account is verified and ready.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md max-w-md mx-auto text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Account Status
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg border border-purple-500/30">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <input type="text"  onChange={(e)=>{setdata(e.target.value)}}/>         <button onClick={handleSend}>send</button>
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        bubbu Chat App &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Dashboard;
