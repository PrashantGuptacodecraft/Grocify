import React, { useEffect, useState } from 'react'
import { FaHeartPulse } from "react-icons/fa6";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { TbMenu2 } from "react-icons/tb";
import { TbMenu3 } from "react-icons/tb";

const Navbar = ({ cartCount }) => {
  const[showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
useEffect(()=>{
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 10);
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []); 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  return (
    <header className={ `fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'drop-shadow-[0_4px_25px_rgba(0,0,0,.9)]' : ''}` }>
      <nav className='max-w-[1400px] mx-auto px-10 md:h-[13vh] h-[12vh] flex  justify-between items-center '>
        <a href="#" className='text-3xl font-bold'>
          Gr<span className='text-orange-500 uppercase'>O</span>cify

        </a>
        {/* Desktop */}
        <ul className=' md:flex items-center gap-x-15 hidden'>
          <li>
            <a href="#home" className='font-semibold tracking-wider text-orange-500'>Home</a>
          </li>
          <li>
            <a href="#category" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Categories</a>
          </li>
          <li>
            <a href="#values" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Values</a>
          </li>
          <li>
            <a href="#products" className='font-semibold tracking-wider text-zinc-500 hover:text-orange-500'>Products</a>
          </li>
        </ul>
        {/* nav action */}
        <div className='flex items-center gap-x-5'>
          {/* input filled */}
          <div className='md:flex  p-1 border-2 border-orange-500 rounded-full hidden'>
            <input type="text"name='text' placeholder='Search' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none'/>
          <button className='bg-gradient-to-b from-orange-400 to-orange-600 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl'> <FaSearch /></button>
          </div>
          

          <a href="#" className='text-zinc-800 text-2xl'><FaHeartPulse /></a>
          <a href="#" className='text-zinc-800 text-2xl relative'>
            <HiMiniShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>

    {/* Hamburger */}
          <a href="#" className='text-zinc-800 text-3xl md:hidden'onClick={toggleMenu} >
            {showMenu ? <TbMenu3 /> : <TbMenu2 />}</a>
        </div>
        {/* Mobile Menu */}
        <ul className={` flex flex-col gap-y-12 bg-orange-500/90 backdrop-blur-xl shadow-xl rounded-xl pd-10 items-center gap-x-15 md:hidden absolute top-30 -left-full transform -translate-x-1/2 transition-all duration-500 ${showMenu ? 'left-1/2' : ''} p-8 w-11/12 z-40`}>
          <li>
            <a href="#home" onClick={toggleMenu} className='font-semibold tracking-wider text-white hover:text-zinc-200 text-xl'>Home</a>
          </li>
          <li>
            <a href="#category" onClick={toggleMenu} className='font-semibold tracking-wider text-white hover:text-zinc-200 text-xl'>Categories</a>
          </li>
          <li>
            <a href="#values" onClick={toggleMenu} className='font-semibold tracking-wider text-white hover:text-zinc-200 text-xl'>Values</a>
          </li>
          <li>
            <a href="#products" onClick={toggleMenu} className='font-semibold tracking-wider text-white hover:text-zinc-200 text-xl'>Products</a>
          </li>
          <li className='flex  p-1 border-2 border-white rounded-full md:hidden w-full'>
            <input type="text"name='text' placeholder='Search' autoComplete='off' className='flex-1 h-[5vh] px-3 focus:outline-none'/>
          <button className='bg-gradient-to-b from-orange-400 to-orange-600 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl'> <FaSearch /></button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
