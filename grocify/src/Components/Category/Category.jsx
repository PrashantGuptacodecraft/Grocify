import React from 'react'
import Heading from '../Heading/Heading'
import FruitsCat from '../../assets/fruits-and-veggies.png'
import SeaFoodCat from '../../assets/meat-and-seafood.png'
import DairyCat from '../../assets/dairy-and-eggs.png'
import Button from '../Button/Button'
const Category = () => {

  const renderCards=category.map((item)=>{
    return(
      // card
      <div className='flex-1 basis-[300px]'>
        {/* card image */}
        <div className=' w-full  min-h-[30vh] relative -mb-10'>
          <img src={item.image} alt={item.title} className='absolute bottom-0' />
        </div>
        {/* card content */}
        <div className='bg-zinc-100 pt-17 p-8 rounded-xl'>
          <h3 className='text-zinc-800 text-3xl font-bold'>{item.title}</h3>
          <p className='text-zinc-600 mt-3 mb-9'>{item.description}</p>
          <Button content={"See All"}></Button>
        </div>
      </div>
        )})

  return (
    <div className='max-w-[1400px] mx-auto px-10 py-20'>
      
      <Heading highlight='Shop' heading='by Category'></Heading>
      {/* categoryCards */}
      <div className='flex  flex-wrap gap-10  md:mt-15 '>
        {renderCards}
      </div>
    </div>
  )
}

export default Category

const category=[
 { id:1,
  title:'Fruits & Veggies',
  description:'Fresh, organic produce sourced daily from local farms. Explore a wide range of seasonal fruits and crisp vegetables.',
  image:FruitsCat,},
 { id:2,
  title:'Dairy & Eggs',
  description:'Wholesome dairy products and free-range eggs. From creamy milk and yogurt to artisanal cheeses.',
  image:DairyCat,},

 { id:3,
  title:'Meat & Seafood',
  description:'High-quality, responsibly sourced meat and seafood. Choose from fresh cuts, marinated options, and more.',
  image:SeaFoodCat,},
 
  
]