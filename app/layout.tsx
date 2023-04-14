import '../styles/globals.css';

export const metadata = {
  title: 'hana-chat',
  description: 'chat demo app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head></head>
      <body className='h-screen w-screen bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500'>
        <div>{children}</div>
      </body>
    </html>
  );
}
