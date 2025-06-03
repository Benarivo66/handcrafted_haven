import { roboto } from '@/app/ui/fonts';

export default function Page(){
    return(
        <div className='m-16'>
            <p className={`text-5xl md:text-7xl font-extrabold ${roboto.className}`}>You are now logged in. Feel free to navigate. </p>
        </div>
    )
}