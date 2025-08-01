// src/app/layout.tsx
import 'antd/dist/reset.css';
import './globals.css'; // jika Anda pakai Tailwind CSS

import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import idID from 'antd/locale/id_ID'; // lokal Indonesia, opsional
import { ReactNode } from 'react';
// app/layout.tsx
import { Playfair_Display } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Invoice Generator',
  description: 'A simple invoice generator using Ant Design + Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <ConfigProvider locale={idID}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
