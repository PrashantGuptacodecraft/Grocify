import React from 'react'
import grocery from '../../assets/grocery.png'
import Button from '../Button/Button'

const Hero = () => {
  return (
    <section>
      <div className='max-w-[1400px] mx-auto px-10 py-20 flex item-center padding-top-25'>
        {/* herocontent */}


        <div className='flex-1 space-y-10'>
          <span className='bg-orange-100 text-orange-500 text-lg px-5 py-2 rounded-full'>Export best quality..</span>
          <h1 className='text-7xl/20 font-bold mt-4'>Tasty Orgainic  
            <span className='text-orange-500'> Fruits</span> & <span className='text-green-500'>Vegigies</span> 
            <br />In Your City</h1>
            <p className='text-zinc-600 text-lg max-w-[530px] mt-5 mb-10'>Bred for a high content of beneficial substances. Our products are all freshand healthy</p>
            <Button content="Shop Now"></Button>
        </div>
        {/* hero image */}
        <div className='flex-1'>
          <img src={grocery} alt="Grocery" />
        </div>
        </div>

    </section>
  )
}

export default Hero
