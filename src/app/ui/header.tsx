'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Team5 Handcraft Haven</h1>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <Link href="/dashboard/sellers/" className="text-gray-700 hover:text-green-600 transition">Sellers</Link>
          <Link href="/dashboard/products/" className="text-gray-700 hover:text-green-600 transition">Products</Link>
          <Link href="/login" className="text-gray-700 hover:text-green-600 transition">Login</Link>
        </nav>
      </div>
    </header>
  );
}
