import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Inter } from '@next/font/google'
import { Toaster } from 'react-hot-toast'


const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <header className={inter.className}>
            <Navbar />
        </header>
        <main className={inter.className}>
            {children}
        </main>
        <Toaster />
        <Footer />
    </>
  )
}

export default Layout