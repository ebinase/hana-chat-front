import '../styles/globals.css';
import Footer from './footer';

export const metadata = {
  title: 'hana-chat',
  description: 'chat demo app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head></head>
      <body>
        <div className='h-screen w-screen bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500'>
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
