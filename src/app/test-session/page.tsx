import { auth } from '@/auth';

export default async function TestSessionPage() {
  const session = await auth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Test Page</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Server-side Session:</h2>
        <pre className="text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Session Status:</h2>
        <p>Session exists: {session ? 'Yes' : 'No'}</p>
        {session && (
          <div>
            <p>User ID: {session.user.id}</p>
            <p>User Name: {session.user.name}</p>
            <p>User Email: {session.user.email}</p>
            <p>Is Seller: {session.user.isSeller ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
} 