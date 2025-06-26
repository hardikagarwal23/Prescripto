import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const banner = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-primary h-[40vh] flex items-center justify-between mt-[70px] rounded-xl px-12 scroll-item'>

      <div className='text-left'>
        <p className='text-white font-medium text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight'>Book Appointment<br />With 100+ Trusted Doctors </p>
        <button onClick={() => { navigate('/login'); scrollTo(0, 0); }} className='bg-white rounded-full font-semibold px-5 py-3 text-gray-600 mt-6 text-sm hover:scale-105 transition-all duration-300'>Create account</button>
      </div>

      <div className='hidden md:block relative md:w-1/2 lg:w-[370px] h-full'>
        <img src={assets.appointment_img} alt='' className=' md:w-72 lg:w-80 absolute bottom-0 right-0' />
      </div>
    </div>
  )
}

export default banner
