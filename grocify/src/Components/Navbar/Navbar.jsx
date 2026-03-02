import React, { useState } from 'react'
import { FaHeartPulse } from "react-icons/fa6";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";

const Navbar = () => {
  const[showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  return (
    <header className='bg-white fixed top-0 left-0 right-0'>
      <nav className='max-w-[1400px] mx-auto px-10 md:h-[13vh] h-[12vh] flex  justify-between items-center '>
        <a href="#" className='text-3xl font-bold'>
          Gr<span className='text-orange-500 uppercase'>O</span>cify

        </a>
        {/* Desktop */}
        <ul className=' md:flex items-center gap-x-15 hidden'>
          <li>
            <a href="#" className='font-semibold tracking-wider text-orange-500'>Home</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>About Us</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Process</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Contact Us</a>
          </li>
        </ul>
        {/* nav action */}
        <div className='flex items-center gap-x-5'>
          {/* input filled */}
          <div className='md:flex  p-1 border-2 border-orange-500 rounded-full hidden'>
            <input type="text"name='text' placeholder='Search' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none'/>
          <button className='bg-gradient-to-b from-orange-400 to-orange-600 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl'> <FaSearch /></button>
          </div>
          

          <a href="" className='text-zinc-800 text-2xl'><FaHeartPulse /></a>
          <a href="" className='text-zinc-800 text-2xl'><HiMiniShoppingBag /></a>

    {/* Hamburger */}
          <a href="#" className='text-zinc-800 text-3xl md:hidden'onClick={toggleMenu} >
            {showMenu ? <TbMenu3 /> : <TbMenu2 />}</a>
        </div>
        {/* Mobile Menu */}
        <ul className={` flex flex-col gap-y-12 bg-orange-500/10 backdrop-blur-xl  rounded-xl pd-10 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ''}`}>
          <li>
            <a href="#" className='font-semibold tracking-wider text-orange-500'>Home</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>About Us</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Process</a>
          </li>
          <li>
            <a href="#" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Contact Us</a>
          </li>
          <li className='flex  p-1 border-2 border-orange-500 rounded-full md:hidden'>
            <input type="text"name='text' placeholder='Search' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none'/>
          <button className='bg-gradient-to-b from-orange-400 to-orange-600 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl'> <FaSearch /></button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
