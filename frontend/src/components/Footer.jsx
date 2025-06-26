import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='mt-[100px] mb-4 '>
     <div className='flex justify-between flex-wrap gap-y-6'>
<div className='w-full md:w-96 '>
    <img src={assets.logo} alt='' className='mb-5 w-40' />

    <p className='mt-[15px] text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo soluta impedit nemo quis officia eveniet nesciunt minus iure dicta dignissimos necessitatibus error eius deleniti voluptates consequuntur sint.</p>
</div>

<div className=''>
    <h1 className='font-medium text-xl'>COMPANY</h1>
    <div className='mt-[20px] text-gray-600'>
        <p>Home</p>
        <p>About us</p>
        <p>Delivery</p>
        <p>Privacy policy</p>
    </div>
</div>

<div className=''>
<h1 className='font-medium text-xl'>GET IN TOUCH</h1>
    
<div className='mt-[20px]  text-gray-600'>
        <p>+0-000-000-000</p>
        <p>prescripto@gmail.com</p>
        
    </div>
</div>

</div> 
<hr className='mt-4' />
<p className='text-center text-black-300 mt-4'>Copyright {new Date().getFullYear()} @prescripto - All Right Reserved.</p>
    </div>
  )
}

export default Footer
