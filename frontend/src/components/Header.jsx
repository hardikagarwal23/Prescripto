import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {

  return (
    
    <div className='flex flex-col md:flex-row flex-wrap justify-between bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

    <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

      <p className='text-white font-medium test-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight '>Book Appointment <br/>With Trusted Doctors </p>
    <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
      <img src={assets.group_profiles} alt='' className='w-28'/>
      <p className='text-white text-sm'>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' />
      schedule your appointment hassle-free.</p>
    </div>
    <a href='#speciality' className='flex items-center gap-2 rounded-full px-8 py-3 text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-500 bg-white' >Book appointment <img src={assets.arrow_icon} alt='' className='w-3'/></a>
    </div>


    <div className='md:w-1/2 relative'>
    <img src={assets.header_img} alt='' className='w-full h-auto rounded-lg md:absolute bottom-0'/>
    </div>


  </div>


  );
};

export default Header;
