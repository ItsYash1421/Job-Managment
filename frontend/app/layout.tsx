import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'Job Management',
  description: 'Admin interface for managing job postings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
