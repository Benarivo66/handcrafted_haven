import { roboto } from '@/src/app/ui/fonts';
import { auth } from '@/auth';

export default async function Page(){
    const session = await auth();
    
    return(
        <div className='m-16'>
            <p className={`text-5xl md:text-7xl font-extrabold ${roboto.className}`}>
                Welcome back, {session?.user?.name || 'User'}!
            </p>
            <p className="text-xl text-gray-600 mt-4">
                You are now logged in. Feel free to navigate through our handcrafted products and sellers.
            </p>
            {session?.user?.isSeller && (
                <p className="text-lg text-green-600 mt-2">
                    You are logged in as a seller. You can manage your products and profile.
                </p>
            )}
        </div>
    )
}