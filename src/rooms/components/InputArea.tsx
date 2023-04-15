'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = { sendMessage: (content: string) => void };

const InputArea: React.FC<Props> = ({ sendMessage }) => {
  const [value, setValue] = useState<string>('');

  const submitMessage = () => {
    sendMessage(value);
    setValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      submitMessage();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className='mb-3'>
      <div className='flex justify-between gap-4 bg-white/50 rounded-lg  focus:bg-white/90'>
        <textarea
          rows={1}
          className='grow p-3 bg-transparent focus:outline-none resize-none overflow-y-hidden'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={submitMessage}
          className='text-gray-600 px-3 hover:text-gray-500 hover:font-bold rounded-lg'
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default InputArea;
