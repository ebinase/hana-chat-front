import '../styles/globals.css'

export const metadata = {
  title: 'hana-chat',
  description: 'chat demo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head></head>
      <body>
        {children}
      </body>
    </html>
  )
}
