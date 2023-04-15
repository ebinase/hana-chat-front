'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { MesssageData } from '../../share/types/API/messages';
import Message from './Message';
import DummyMessage from './DummyMessage';
import useUserName from '../../share/hooks/useUserName';

type Props = {
  messages: MesssageData[];
  isLoading: boolean;
};

const MessageTimeline: React.FC<Props> = ({ messages, isLoading }) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, [messages]);

  const { name } = useUserName();

  // useEffect(() => {
  //   const currentName = name;
  // }, [name])

  const displayData = !isLoading ? messages : [...Array(10)];

  return (
    <div className='flex flex-col gap-3 overflow-y-auto h-[650px]'>
      {displayData.map((message, index) => {
        const isMyMessage = isLoading ? index % 3 === 2 : message?.authorName === name;
        return (
          <div
            key={index}
            className={'w-full flex ' + (isMyMessage ? 'justify-end' : 'justify-start')}
          >
            {!isLoading ? (
              <Message message={message} isMyMessage={isMyMessage}></Message>
            ) : (
              <DummyMessage isMyMessage={isMyMessage} />
            )}
          </div>
        );
      })}
      <div ref={scrollBottomRef} />
    </div>
  );
};

export default MessageTimeline;