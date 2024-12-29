import { Bitter } from 'next/font/google';
import { ThemeProvider } from '@/components/wrapper/theme-provider';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { Navigation } from '@/components/ui/navigation';
import './globals.css';

const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'kmarellano',
  description: 'Personal Portfolio of kmarellano',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${bitter.className} antialiased`}
          suppressHydrationWarning
        >
          <Navigation />
          <div className="absolute bottom-20 flex items-center rotate-180 [writing-mode:vertical-rl] text-xs text-primary/70">
            <div className="flex items-center">
              <Separator
                className="w-12 mb-10 transform rotate-90 bg-primary/70"
                decorative={true}
              />
              <span className="inline-block transform rotate-90 mb-2">©</span>
            </div>
            <p>{new Date().getFullYear()} kmarellano</p>
          </div>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            themes={[
              'dark',
              'light',
              'blue',
              'red',
              'green',
              'purple',
              'pink',
              'orange',
              'yellow',
            ]}
          >
            {children}
          </ThemeProvider>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
