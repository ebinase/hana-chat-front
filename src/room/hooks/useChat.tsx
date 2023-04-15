'use client';

import { useEffect } from 'react';
import useMessages from './useMessages';
import useConnection from './useConnection';

const useChat = (uniqueKey: string) => {
  const { messages, isLoading, addMessage } = useMessages(uniqueKey);
  const { isConnected, connection } = useConnection();

  const sendMessage = (content: string, authorName: string) => {
    console.log(content);
    if (!content) return;

    isConnected ? connection?.send(content) : console.log('WebSocketつながってないよ！');
    addMessage({
      id: messages.length + 1,
      authorName: authorName,
      content,
      createdAt: '2023/03/21-00:00:00',
      updatedAt: '2023/03/21-00:00:00',
    });
  };

  useEffect(() => {
    if (connection === undefined) {
      console.log('有効なWebSocket接続がありません！');
      return;
    }

    // 受信時の処理
    connection.onmessage = (event: { data: string }) => {
      console.log('MessageRecieved!!');

      addMessage({
        id: messages.length + 1,
        authorName: 'Server',
        content: event.data,
        createdAt: '2023/03/21-00:00:00',
        updatedAt: '2023/03/21-00:00:00',
      });
    };
  }, [connection, messages, addMessage]);

  return { messages, isLoading, sendMessage };
};

export default useChat;
