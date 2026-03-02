import React from 'react'
import Navbar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import Category from '../Category/Category'
import Values from '../Values/Values'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero></Hero>
      <Category></Category>
      <Values></Values>
    </div>
  )
}

export default Home
