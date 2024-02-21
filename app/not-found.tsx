import Link from 'next/link'
import React from 'react'

export default function notfound() {
    return (
        <div className=' flex justify-center items-center flex-col gap-10 h-[75vh]'>
            <p className='text-5xl lg:text-8xl'> Page Not Found</p>
            <p className='text-sm text-gray-400 lg:text-base'>Your Visited page not founded ! please go back to home page</p>
            <Link href={"/"} className='px-20 text-center py-8 bg-red-500 text-white rounded-md text-xl'>Back to home page</Link>
        </div>
    )
}
