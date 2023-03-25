import { Suspense} from 'react'
import Link from 'next/link';
import Loading from '../../../loding';
import Messages from './messages';

const Page = async ({ params }: { params: { uniqueKey: string } }) => {
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
          <Suspense fallback={<Loading/>}>
            <Messages/>
          </Suspense>
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
