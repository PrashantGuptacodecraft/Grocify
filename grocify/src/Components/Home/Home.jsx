import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Category from '../Category/Category'
import Values from '../Values/Values'
import Products from '../Products/Products'
import Testimonials from '../Testimonials/Testimonials'
import Footer from '../Footer/Footer'
import CartDrawer from '../Cart/CartDrawer'
import Checkout from '../Checkout/Checkout'

const Home = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="category"><Category /></div>
      <div id="values"><Values /></div>
      <div id="products"><Products /></div>
      <Testimonials />
      <Footer />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  )
}

export default Home
