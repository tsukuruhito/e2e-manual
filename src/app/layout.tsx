import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '管理システム',
  description: 'E2Eテスト用管理システム',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="border-collapsed overflow-hidden">
          <div className="grid h-screen lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="">管理システム</span>
                  </div>
                </div>
                <div className="flex-1">
                  <Sidebar />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
