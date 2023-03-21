"use client"

import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link';


const Page = ({params}:{params:{uniqueKey:string}}) => {
  const [messages, setMessage] = useState([...Array(5)].map(() => 'いえーい'))
  const [input, setInput] = useState('')

  const add = (messages: string[]): string[] => input !== '' ? [...messages, input]: messages;

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
          {messages.map((content, index) => {
            return (
              <div key={index} className='flex align-top gap-5'>
                <div className='bg-fuchsia-200 rounded-full w-8 h-8 text-center align-text-center text-white font-extrabold'>{index+1}</div>
                <div className='flex-grow bg-fuchsia-200 rounded-lg mt-4 px-1 py-3'>{content}</div>
              </div>
            );
          })}
        </div>
        <div className='bg-slate-200 py-4 px-6 flex justify-between gap-4'>
          <input className='grow' type="text" value={input} onChange={(event) => setInput(event.target.value)}/>
          <button className='' onClick={() => setMessage(add)}>送信</button>
        </div>
      </main>
    </div>
  )
}

export default Page
