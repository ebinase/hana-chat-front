'use client';

import useSWRImmutable from 'swr/immutable';
import { MesssageData } from '../../share/types/API/messages';
import { useEffect, useState } from 'react';

type Result = {
  data: MesssageData[];
  isLoading: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInitialFetch = (uniqueKey: string): Result => {
  const { data, isLoading } = useSWRImmutable(`/api/rooms/${uniqueKey}/messages`, fetcher);
  return {
    data: data?.messages ?? [],
    isLoading,
  };
};

const useMessages = (uniqueKey: string) => {
  const [messages, setMessages] = useState<MesssageData[]>([]);
  const { data, isLoading } = useInitialFetch(uniqueKey);

  useEffect(() => {
    if (!isLoading) {
      setMessages(data);
    }
  }, [isLoading, data]);

  const addMessage = (message: MesssageData) => setMessages([...messages, message]);

  return {
    messages,
    isLoading,
    addMessage,
  };
};

export default useMessages;
