import { spaceGrotesk } from '@/fonts/font'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} className={`${spaceGrotesk.className} text-2xl`}>Flex Gear</Link>
    )
}
