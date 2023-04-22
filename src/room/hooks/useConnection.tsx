'use client';

import { useRef, useState, useEffect } from 'react';

const useConnection = () => {
  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);

  // websocket周り
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8081/socket');
    console.log(socketRef);
    socketRef.current.onopen = function () {
      setIsConnected(true);
      console.log('Connected');
    };

    socketRef.current.onclose = function () {
      console.log('closed');
      setIsConnected(false);
    };

    return () => {
      if (socketRef.current == null) {
        return;
      }
      socketRef.current.close();
    };
  }, []);

  return { isConnected, connection: socketRef.current };
};

export default useConnection;
