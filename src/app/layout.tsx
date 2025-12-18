// src/app/layout.tsx

import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Luna Belly Dance Studio',
  description: 'Belly dance classes with passion and grace',
};