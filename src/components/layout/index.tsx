import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Inter } from '@next/font/google'


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
        <Footer />
    </>
  )
}

export default Layout