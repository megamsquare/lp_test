"use client"

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function LoginButton (){
    const { data: session } = useSession()

    if(session && session.user) {
        return (
            <div>
                <button onClick={() => signOut()} type='submit'>
                    Sign Out
                </button>
            </div>
        )
    }

    return <button onClick={() => signIn()}  type='submit'>Sign In</button>

}