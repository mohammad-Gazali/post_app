import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <header>
            <Navbar />
        </header>
        <main>
            {children}
        </main>
        <Toaster />
        <Footer />
    </>
  )
}

export default Layout