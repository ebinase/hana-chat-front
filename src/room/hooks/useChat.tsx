'use client';

import { useEffect } from 'react';
import useMessages from './useMessages';
import useConnection from './useConnection';

const useChat = (uniqueKey: string) => {
  const { messages, isLoading, addMessage } = useMessages(uniqueKey);
  const { isConnected, connection } = useConnection();

  const sendMessage = (content: string, authorName: string) => {
    if (!content) return;
    console.log('MessageSent!!');

    console.log(JSON.stringify({content, authorName, uniqueKey}));
    
    isConnected ? connection?.send(JSON.stringify({content, authorName, uniqueKey})) : console.log('WebSocketつながってないよ！');
  };

  useEffect(() => {
    if (connection === undefined) {
      console.log('有効なWebSocket接続がありません！');
      return;
    }

    // 受信時の処理
    connection.onmessage = (event: { data: string }) => {
      console.log('MessageRecieved!!');
      console.log(event.data);

      // jsonをparse
      const parsedData = JSON.parse(event.data);

      addMessage({
        id: parsedData.id,
        authorName: parsedData.authorName,
        content: parsedData.content,
        createdAt: parsedData.createdAt,
        updatedAt: parsedData.updatedAt ?? '',
      });
    };
  }, [connection, messages, addMessage]);

  return { messages, isLoading, sendMessage, isConnected };
};

export default useChat;
