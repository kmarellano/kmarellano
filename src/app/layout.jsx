import { Bitter } from 'next/font/google';
import { ThemeProvider } from '@/components/wrapper/theme-provider';
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bitter.className} antialiased`}
        suppressHydrationWarning
      >
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
      </body>
    </html>
  );
}
