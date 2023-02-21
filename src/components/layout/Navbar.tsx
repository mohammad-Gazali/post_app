import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';


const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className='w-full lg:px-8 px-4 py-5 bg-slate-900 shadow-lg flex justify-between items-center'>
      <Link href={"/"}>
        <h1 className='font-bold text-2xl text-white'>
          Light Post App
        </h1>
      </Link>
      <ul className='flex items-center gap-5 relative'>
        <Link className='text-white/70 hover:text-white transition-all' href={'/'}>
          Home
        </Link>
        {session?.user 
        ?
        <>
          <button className='text-white/70 hover:text-white transition-all' onClick={() => signOut()}>
            Sign Out
          </button>
          <Link href={"profile/"} className='text-white/70 hover:text-white transition-all peer'>
            <img src={session.user.image as string} alt={"avatar"} height={36} width={36} className="rounded-full bg-slate-400" />
          </Link>
          <div className='transitiona-all invisible duration-300 absolute text-white bg-zinc-800 rounded-lg p-2 -right-4 top-10 opacity-0 peer-hover:opacity-100 peer-hover:visible'>
            profile
          </div>
        </>
        :
        <button className='text-white/70 hover:text-white transition-all' onClick={() => signIn()}>
          Sign In
        </button>
        }
      </ul>
    </nav>
  )
}

export default Navbar