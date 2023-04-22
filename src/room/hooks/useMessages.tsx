'use client';

import useSWRImmutable from 'swr/immutable';
import { MesssageData } from '../../share/types/API/messages';
import { useEffect, useState } from 'react';

type Result = {
  data: MesssageData[];
  isLoading: boolean;
  error: Error | undefined;
};

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);
      return data;
    });

const useInitialFetch = (uniqueKey: string): Result => {
  const { data, isLoading, error } = useSWRImmutable(
    `http://localhost:8080/rooms/${uniqueKey}/messages`,
    fetcher,
  );
  return {
    data: data?.messages ?? [],
    isLoading,
    error,
  };
};

const useMessages = (uniqueKey: string) => {
  const [messages, setMessages] = useState<MesssageData[]>([]);
  const { data, isLoading, error } = useInitialFetch(uniqueKey);

  useEffect(() => {
    if (!isLoading) {
      setMessages(data);
    }
  }, [isLoading]);

  const addMessage = (message: MesssageData) => setMessages([...messages, message]);

  return {
    messages,
    isLoading,
    addMessage,
    error,
  };
};

export default useMessages;
