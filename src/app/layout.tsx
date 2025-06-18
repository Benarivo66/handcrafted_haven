import '@/src/app/ui/global.css'
import { openSans } from '@/src/app/ui/fonts';
import { Metadata } from 'next';
import { Footer } from './ui/footer';
import Header from './ui/header';
import { Providers } from './ui/providers';
import { auth } from '@/auth';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Handcraft Haven',
    default: 'Handcraft Haven',
  },
  description: 'Website for Craftsmen and women to showcase their skill and products',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Providers session={session}>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
