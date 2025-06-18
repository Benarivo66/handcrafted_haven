'use client';

import { useSession } from 'next-auth/react';

export default function SessionDebug() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-20 right-4 bg-white p-4 border rounded shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Session Debug</h3>
      <div className="text-sm">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Session exists:</strong> {session ? 'Yes' : 'No'}</p>
        {session && (
          <div className="mt-2">
            <p><strong>User:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>ID:</strong> {session.user.id}</p>
            <p><strong>Is Seller:</strong> {session.user.isSeller ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
} 