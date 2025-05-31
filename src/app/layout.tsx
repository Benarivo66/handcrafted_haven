import '@/app/ui/global.css'
import { openSans } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Footer } from './ui/footer';
import Header from './ui/header';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Handcraft Haven',
    default: 'Handcraft Haven',
  },
  description: 'Website for Craftsmen and women to showcase their skill and products',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
    </html>
  );
}
