import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Category from '../Category/Category'
import Values from '../Values/Values'
import Products from '../Products/Products'
import Testimonials from '../Testimonials/Testimonials'
import Footer from '../Footer/Footer'

const Home = () => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <div id="home"><Hero /></div>
      <div id="category"><Category /></div>
      <div id="values"><Values /></div>
      <div id="products"><Products addToCart={addToCart} /></div>
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
