import { Suspense, use, useState } from 'react'
import Link from 'next/link';
import { MesssageData } from '../../../pages/api/rooms/[uniqueKey]/messages';

async function getMessages(): Promise<MesssageData[]> {
  const res = await fetch("http://localhost:3000/api/rooms/hoge/messages", {
  cache: "no-store",
});

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.messages as MesssageData[];
}

const Page = async ({params}:{params:{uniqueKey:string}}) => {
  // const [messages, setMessage] = useState([])
  // const [input, setInput] = useState('')

  // const add = (messages: string[]): string[] => input !== '' ? [...messages, input]: messages;

  const messages = await getMessages();

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-fuchsia-900 px-4 py-4 flex justify-between md-flex-col'>
        <div className='flex gap-3'>
          <Link href={'/'} className='text-white font-extrabold'>{'<'}</Link>
          <h1 className='text-xl text-white font-extrabold'>吉田チャット</h1>
          {params.uniqueKey}
        </div>
        <div className='text-white'>
          メニュー
        </div>
      </header>
      <main className='py-0 px-8 flex flex-col flex-grow '>
        <div className='flex-grow my-2'>
          {/* children には page.tsx のコンテンツが挿入される */}
          {messages.map((message) => {
            return (
              <div key={message.id} className='flex align-top gap-5'>
                <div className='bg-fuchsia-200 rounded-full w-8 h-8 text-center align-text-center text-white font-extrabold'>{message.authorName}</div>
                <div className='flex-grow bg-fuchsia-200 rounded-lg mt-4 px-1 py-3'>{message.content}</div>
              </div>
            );
          })}
        </div>
        <div className='bg-slate-200 py-4 px-6 flex justify-between gap-4'>
          <input className='grow' type="text" />
          <button className=''>送信</button>
        </div>
      </main>
    </div>
  )
}

export default Page
