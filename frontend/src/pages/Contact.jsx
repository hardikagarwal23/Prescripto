import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='mt-10 flex flex-col items-center '>

        <div>   <p className='text-gray-500 font-medium text-2xl'>CONTACT <span className='text-gray-900'>US</span></p>  </div>

        <div className='flex flex-col md:flex-row gap-x-12 mt-12'>
          <img src={assets.contact_image} alt='' className='w-full md:w-96' />

          <div className='text-gray-600 text-sm flex flex-col items-start justify-start gap-y-6 md:w-1/2 sm:w-full mt-6 md:mt-4'>


            <p className='text-gray-600 font-semibold text-lg'>OUR OFFICE</p>
            <p>00000 Willms Station<br />
              Suite 000, Washington, USA</p>
            <p>Tel: (000) 000-0000<br />
              Email: greatstackdev@gmail.com
            </p>


            <p className='text-gray-600 font-semibold text-lg'>CAREERS AT PRESCRIPTO</p>
            <p>Learn more about our teams and job openings</p>
            <button className='border border-black px-4 py-3 hover:text-white hover:bg-black transition-all duration-400 ease-in-out'>Explore Jobs</button>


          </div>

        </div>

      </div>


    </div>

  );
};

export default Contact;
