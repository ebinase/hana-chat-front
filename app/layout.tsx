'use client';

import { CookiesProvider } from 'react-cookie';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <CookiesProvider>
        <head>
          <title>hana-chat</title>
          <meta name='description' content='chat demo app' />
        </head>
        <body className='h-screen w-screen bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500'>
          <div>{children}</div>
        </body>
      </CookiesProvider>
    </html>
  );
}
