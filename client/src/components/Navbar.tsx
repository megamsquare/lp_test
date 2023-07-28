import Link from 'next/link';
import React from 'react';
import LoginButton from './LoginButton';

export default function Navbar (){

    return(

        <nav>
            <Link href={"/"}>LP Test</Link>
            <LoginButton />
        </nav>

    )

}