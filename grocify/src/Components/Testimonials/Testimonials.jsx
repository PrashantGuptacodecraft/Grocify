import React from 'react'
import Heading from '../Heading/Heading'

import customer1 from '../../assets/customer1.jpg'
import customer2 from '../../assets/customer2.jpg'
import customer3 from '../../assets/customer3.jpg'
import { FaStar } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Regular Customer',
    image: customer1,
    review: 'Grocify has completely changed how I shop for groceries. The organic produce is always incredibly fresh, and the delivery is remarkably fast!',
    stars: 5,
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Food Blogger',
    image: customer2,
    review: 'I am always impressed by the quality of the meat and seafood. It makes cooking so much more enjoyable knowing I am using top-tier ingredients.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Healthy Eater',
    image: customer3,
    review: 'The variety of fresh fruits and vegetables is unmatched. Plus, their customer service is top notch. Highly recommend Grocify to everyone.',
    stars: 5,
  }
]

const Testimonials = () => {
  return (
    <section id="testimonials" className='max-w-[1400px] mx-auto px-10 py-20'>
      <Heading highlight="Our" heading="Customers"></Heading>
      <div className='grid md:grid-cols-3 gap-8 mt-15'>
        {testimonials.map((item) => (
          <div key={item.id} className='bg-zinc-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 relative'>
            <div className='flex items-center gap-4 mb-6'>
              <img src={item.image} alt={item.name} className='w-16 h-16 rounded-full object-cover shadow-md' />
              <div>
                <h4 className='text-xl font-bold text-zinc-800'>{item.name}</h4>
                <p className='text-zinc-500 text-sm'>{item.role}</p>
              </div>
            </div>
            <div className='flex gap-1 text-orange-400 mb-4'>
              {[...Array(item.stars)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className='text-zinc-600 italic leading-relaxed'>"{item.review}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
