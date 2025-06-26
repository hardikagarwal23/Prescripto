import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

const SpecialityMenu = () => {
  return (
    <div className='text-center gap-y-6 flex flex-col mt-[70px] scroll-item ' id='speciality'>

      <h1 className='text-4xl font-semibold text-gray-700'>Find by Speciality</h1>

      <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>

      <div className='flex sm:justify-center gap-x-6 text-center text-sm font-semibold w-full text-gray-600 overflow-scroll py-3'>
        {specialityData.map((item, index) => (
          <Link onClick={() => { scrollTo(0) }} Key={index} to={`/doctors/${item.speciality}`} className='flex flex-col items-center flex-shrink-0 text-xs hover:-translate-y-2 transition-all duration-500'>
            <img src={item.image} alt='' className='w-16 sm:w-24' />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
