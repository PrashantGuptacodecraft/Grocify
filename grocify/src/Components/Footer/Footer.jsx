import React, { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer id="footer" className='bg-zinc-800 text-white mt-20 pt-16 pb-8'>
      <div className='max-w-[1400px] mx-auto px-10 grid md:grid-cols-4 gap-10'>
        <div>
          <h3 className='text-3xl font-bold mb-6'>Gr<span className='text-orange-500 uppercase'>O</span>cify</h3>
          <p className='text-zinc-400'>Delivering the freshest organic produce directly to your doorstep. Healthy living made simple.</p>
        </div>
        <div>
          <h4 className='text-xl font-bold mb-6'>Quick Links</h4>
          <ul className='space-y-4'>
            <li><a href="#home" className='text-zinc-400 hover:text-orange-500 transition'>Home</a></li>
            <li><a href="#about" className='text-zinc-400 hover:text-orange-500 transition'>About Us</a></li>
            <li><a href="#products" className='text-zinc-400 hover:text-orange-500 transition'>Products</a></li>
            <li><a href="#testimonials" className='text-zinc-400 hover:text-orange-500 transition'>Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 className='text-xl font-bold mb-6'>Contact Us</h4>
          <ul className='space-y-4 text-zinc-400'>
            <li>123 Market Street, Suite 100</li>
            <li>Cityville, ST 12345</li>
            <li>Email: support@grocify.com</li>
            <li>Phone: (555) 123-4567</li>
          </ul>
        </div>
        <div>
          <h4 className='text-xl font-bold mb-6'>Newsletter</h4>
          <p className='text-zinc-400 mb-4'>Subscribe to get the latest updates and offers.</p>
          {subscribed ? (
            <p className='text-green-400 font-semibold'>Thanks for subscribing! 🎉</p>
          ) : (
            <form className='flex' onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email address'
                className='bg-zinc-700 px-4 py-2 rounded-l-lg focus:outline-none w-full text-white'
              />
              <button type="submit" className='bg-orange-500 px-4 py-2 rounded-r-lg font-bold hover:bg-orange-600 transition'>Go</button>
            </form>
          )}
        </div>
      </div>
      <div className='max-w-[1400px] mx-auto px-10 mt-16 pt-8 border-t border-zinc-700 text-center text-zinc-500'>
        <p>&copy; {new Date().getFullYear()} Grocify. All rights reserved. Final Project.</p>
      </div>
    </footer>
  )
}

export default Footer
