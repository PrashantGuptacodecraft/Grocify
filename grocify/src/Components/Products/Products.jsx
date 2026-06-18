import React, { useState } from 'react'
import Heading from '../Heading/Heading'
import { useCart } from '../../context/cartStore'

import banana from '../../assets/banana.png'
import beef from '../../assets/beef.png'
import broccoli from '../../assets/broccoli.png'
import cheese from '../../assets/cheese.png'
import milk from '../../assets/milk.png'
import strawberry from '../../assets/strawberry.png'
import salmon from '../../assets/salmon.png'
import eggs from '../../assets/eggs.png'

const products = [
  { id: 1, name: 'Fresh Banana', price: 1.99, image: banana },
  { id: 2, name: 'Organic Beef', price: 8.99, image: beef },
  { id: 3, name: 'Broccoli', price: 2.49, image: broccoli },
  { id: 4, name: 'Cheddar Cheese', price: 4.99, image: cheese },
  { id: 5, name: 'Fresh Milk', price: 3.49, image: milk },
  { id: 6, name: 'Strawberries', price: 4.99, image: strawberry },
  { id: 7, name: 'Salmon Fillet', price: 12.99, image: salmon },
  { id: 8, name: 'Farm Eggs', price: 3.99, image: eggs },
]

const Products = () => {
  const { addToCart, openCart } = useCart()
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    addToCart(product)
    openCart()
    setAddedId(product.id)
    setTimeout(() => setAddedId((prev) => (prev === product.id ? null : prev)), 1200)
  }

  return (
    <section className='max-w-[1400px] mx-auto px-10 py-20'>
      <Heading highlight="Our" heading="Products"></Heading>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-15'>
        {products.map(product => (
          <div key={product.id} className='bg-zinc-50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer border border-zinc-100'>
            <div className='h-40 w-full flex justify-center items-center mb-6 overflow-hidden'>
              <img src={product.image} alt={product.name} className='h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md' />
            </div>
            <div className='w-full text-center'>
              <h3 className='text-xl font-bold text-zinc-800 mb-2'>{product.name}</h3>
              <p className='text-orange-500 font-semibold text-lg mb-4'>${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAdd(product)}
                className='w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors shadow-md'>
                {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
