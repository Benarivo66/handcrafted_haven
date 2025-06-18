'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      const result = await signOut({ 
        redirect: false,
        callbackUrl: '/'
      });
      console.log('SignOut result:', result);
      
      // Manually redirect to home page
      router.push('/');
      // Force a page refresh to ensure session state is updated
      setTimeout(() => {
        router.refresh();
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Team5 Handcraft Haven</h1>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <Link href="/dashboard/sellers/" className="text-gray-700 hover:text-green-600 transition">Sellers</Link>
          <Link href="/dashboard/products/" className="text-gray-700 hover:text-green-600 transition">Products</Link>
          
          {isLoading ? (
            <span className="text-gray-500">Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-gray-700 hover:text-green-600 transition">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
