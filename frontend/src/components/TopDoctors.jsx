import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

 
const TopDoctors = () => {
  const navigate=useNavigate()

  const {doctors}= useContext(AppContext)

  return (
    <div className='text-center gap-y-4 flex flex-col mt-[50px] scroll-item'>
      <h1 className='text-4xl font-medium text-gray-700 '>Top Doctors to Book</h1>
      <p className=''>Simply browse through our extensive list of trusted doctors</p>

      <div className='grid grid-cols-auto gap-4 gap-y-6'>
         {
        
        doctors
          .slice(0, 12)
          .map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
              }}
              key={index}
              className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img src={item.image} alt="" className="bg-blue-100" />

              <div className="p-4 text-left">
              {item.available ? <p className="text-green-600 inline-flex items-center font-semibold">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Available
                </p>:<p className="text-gray-300 inline-flex items-center font-semibold">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  Not Available
                </p>}
                <p className="text-1xl font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
      }
      </div>
     <div><button onClick={()=>{scrollTo(0,0);navigate('/doctors'); }} className='rounded-full bg-blue-100 px-12 py-3 mt-10 text-gray-600'>more</button></div> 
    </div>
  )
}

export default TopDoctors
