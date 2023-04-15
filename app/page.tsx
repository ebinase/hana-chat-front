'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

const tilt = (e: MouseEvent<HTMLDivElement>) => {
  const target = document.querySelector<HTMLDivElement>('#tiltContainer');
  if (!target) {
    return;
  }

  const xAxis = (window.innerWidth / 2 - e.pageX) / 10;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 10;

  const easingFactor = target.contains(e.target as Node) ? 0.05 : 0.4; // タイル上にいるときは傾きを緩やかにする
  const tiltX = yAxis * easingFactor;
  const tiltY = -xAxis * easingFactor;
  target.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
};

const Home: NextPage = () => {
  const router = useRouter();

  const handleSearch = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (target.value.length === 36) {
      router.push('/rooms/' + target.value);
    }
  };
  return (
    <div>
      <main className='h-screen w-full flex items-center justify-center' onMouseMove={tilt}>
        <div
          id='tiltContainer'
          style={{
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
            transition: 'all 0.5s ease-out',
          }}
          className='text-center p-5 max-w-1/3 mx-4 bg-white/30 backdrop-blur-lg rounded-md border border-white/40 shadow-lg'
        >
          <div className=' p-10 text-center'>
            <svg
              className='fill-white/60 h-max'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 183.778 200'
            >
              <path
                d='M37.1,264.181c-2.477-.307-5.008-.7-8.4,1.256s-4.306,4.343-5.279,6.642a45.089,45.089,0,0,0-2.342,7.781,183.884,183.884,0,0,0-3.14,22.054c-1.631,17.419-2.427,39.7-2.427,62.011s.8,44.6,2.427,62.022A183.883,183.883,0,0,0,21.085,448a45.087,45.087,0,0,0,2.342,7.781c.973,2.3,1.89,4.685,5.279,6.642s5.921,1.551,8.4,1.245a44.917,44.917,0,0,0,7.9-1.852A184.123,184.123,0,0,0,65.683,453.5c15.9-7.3,35.6-17.753,54.923-28.909s38.215-22.98,52.485-33.1a184.17,184.17,0,0,0,17.541-13.752,44.929,44.929,0,0,0,5.556-5.918c1.5-1.992,3.108-3.984,3.108-7.9s-1.6-5.9-3.108-7.887a44.939,44.939,0,0,0-5.556-5.918,184.141,184.141,0,0,0-17.541-13.752c-14.27-10.122-33.162-21.946-52.485-33.1s-39.021-21.612-54.923-28.909A184.128,184.128,0,0,0,45,266.044a45,45,0,0,0-7.9-1.863Zm-.7,14.571a32.679,32.679,0,0,1,4.29,1.054,174.421,174.421,0,0,1,18.978,7.653c15.255,7,34.7,17.309,53.72,28.292s37.677,22.668,51.368,32.379a174.465,174.465,0,0,1,16.115,12.6,32.291,32.291,0,0,1,3.055,3.2,32.474,32.474,0,0,1-3.055,3.193,174.46,174.46,0,0,1-16.115,12.6c-13.69,9.711-32.345,21.4-51.368,32.379S74.924,433.4,59.669,440.4a174.528,174.528,0,0,1-18.978,7.653,32.515,32.515,0,0,1-4.29,1.054,32.376,32.376,0,0,1-1.245-4.247A174.583,174.583,0,0,1,32.3,424.606c-1.565-16.711-2.363-38.715-2.363-60.681s.8-43.959,2.363-60.671A174.591,174.591,0,0,1,35.156,283a32.373,32.373,0,0,1,1.245-4.247Z'
                transform='translate(-15.518 -263.927)'
              />
            </svg>
          </div>

          <h1 className='text-white/80 text-4xl'>Welcome to HANA-Chat</h1>

          <div className='mt-10 flex justify-between gap-2'>
            <div className='w-7 fill-white/50'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                <g transform='translate(-14.472 -263.847)'>
                  <path
                    d='M144.663,286.184a76.265,76.265,0,1,0-14.4,119.046L183.534,458.5a18.1,18.1,0,1,0,25.591-25.591l-53.269-53.268a76.265,76.265,0,0,0-11.195-93.456ZM124.12,306.728a47.211,47.211,0,1,1-66.767,0,47.212,47.212,0,0,1,66.767,0Z'
                    transform='translate(0 0)'
                  />
                </g>
              </svg>
            </div>
            <input
              type='text'
              placeholder='ルームIDを入力...'
              className='grow bg-white/40 text-center focus:outline-none focus:shadow-white/50 focus:shadow-md'
              onBlur={handleSearch}
            />
          </div>

          <div className='mt-10'>
            <Link href='/rooms/f41ce51e-4c7e-8f57-ebeb-3e8091a9cb11'>
              <button>ルーム作成</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
