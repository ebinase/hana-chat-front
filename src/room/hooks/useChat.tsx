'use client';

import { useState, useRef, useEffect } from "react";
import { MesssageData } from "../../share/types/API/messages";
import useSWRImmutable from 'swr/immutable';

type Props = { uniqueKey: string };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Result = {
  data: MesssageData[];
  isLoading: boolean;
};

const useMessage = (uniqueKey: string): Result => {
  const { data, isLoading } = useSWRImmutable(`/api/rooms/${uniqueKey}/messages`, fetcher);

  return {
    data: data?.messages ?? [],
    isLoading,
  };
};

const useChat = ({uniqueKey}: Props) => {


  const { data, isLoading } = useMessage(uniqueKey);

  const [messages, setMessages] = useState<MesssageData[]>([]);

  const socketRef = useRef<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);

  // websocket周り
  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080/socket');
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

  useEffect(() => {
    if (!socketRef.current) {
      console.log('有効なWebSocket接続がありません！');
      return;
    }

    // 受信時の処理
    socketRef.current.onmessage = (event: { data: string }) => {
      console.log('MessageRecieved!!');

      setMessages((old) => [
        ...old,
        {
          id: messages.length + 1,
          authorName: 'Server',
          content: event.data,
          createdAt: '2023/03/21-00:00:00',
          updatedAt: '2023/03/21-00:00:00',
        },
      ]);
    };
  }, [socketRef, messages]);

  useEffect(() => {
    if (!isLoading && data) {
      setMessages(data);
    }
  }, [isLoading, data]);

  const sendMessage = (content: string, authorName: string) => {
    console.log(content);
    if (!content) return;

    isConnected ? socketRef.current?.send(content) : console.log('WebSocketつながってないよ！');
    setMessages((old) => [
      ...old,
      {
        id: messages.length + 1,
        authorName: authorName,
        content,
        createdAt: '2023/03/21-00:00:00',
        updatedAt: '2023/03/21-00:00:00',
      },
    ]);
  };

    return {messages, isLoading, sendMessage}
};

export default useChat;