import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = () => {
    // Already connected
    if (socket?.connected) return;

    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    // Save socket
    setSocket(newSocket);

    // Event Listeners
    newSocket.on("connect", () => {
      console.log("✅ Connected:", newSocket.id);
      setIsConnected(true);
    });
   newSocket.on('message',(data)=>{
        console.log(data)
   })
    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Connection Error:", err.message);
      setIsConnected(false);
    });
  };

  const disconnectSocket = () => {
    if (!socket) return;

    socket.disconnect();
    setSocket(null);
    setIsConnected(false);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        connectSocket,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocket must be used within SocketProvider"
    );
  }

  return context;
};