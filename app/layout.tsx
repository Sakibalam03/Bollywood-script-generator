import type { Metadata } from 'next';
import { Bebas_Neue, Cormorant_Garamond, Inter } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Masala Magic — Bollywood Drama Generator',
  description: 'Transform any real-world situation into an absurd multi-scene Bollywood movie script using AI multi-agents.',
  metadataBase: new URL(appUrl),
  openGraph: {
    title: 'Masala Magic — Bollywood Drama Generator',
    description: 'Transform any real-world situation into an absurd Bollywood blockbuster.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} ${cormorant.variable} antialiased min-h-screen`}>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
