import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// ✅ Safety check for env variable
const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  console.warn("⚠️ VITE_BASE_URL is not defined in your .env file");
}

const socket = io(baseURL, {
  withCredentials: true,
  transports: ['websocket'],
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
    });

    // 🧹 Clean up on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Prop types for ESLint
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
