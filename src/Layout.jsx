import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
// import About from './components/About'
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <About /> */}
      <Footer />
    </div>
  )
}

export default Layout
