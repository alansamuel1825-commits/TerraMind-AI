
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'EcoSystem AI | Global Intelligence Platform',
  description: 'AI-driven sustainability, energy, and bio-health predictive dashboard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background min-h-screen flex">
        <Sidebar />
        <main className="flex-grow p-8 overflow-auto">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
