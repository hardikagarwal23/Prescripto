import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, getAllDoctors, aToken, changeAvailability, removeDoctor } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='px-6 pb-6 overflow-y-auto max-h-[100vh]'>
      <p className="font-semibold text-black text-lg my-4">All Doctors</p>


      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3  '>
        {doctors.map((item, index) => (

          <div key={index} className='border border-blue-300 rounded-xl overflow-hidden group shadow-lg'>
            <img
              src={item.image}
              alt=''
              className='bg-blue-100 group-hover:bg-primary transition-all duration-500 w-full h-56 object-cover'
            />
            <div className='p-4 text-left flex justify-between items-end'>

              <div>
                <p>
                  <input
                    className={`cursor-pointer accent-green-50 border-2 border-gray-400 rounded-md`}
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <span className={`ml-2 ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                    Available
                  </span>
                </p>


                <p className='text-lg font-semibold'>{item.name}</p>
                <p className='text-gray-600'>{item.speciality}</p>
              </div>

              <div onClick={() => {
                if (window.confirm("Do you really want to remove this doctor?")) {
                  removeDoctor(item._id);
                }
              }} className='bg-red-50 cursor-pointer rounded-full hover:bg-red-150 hover:scale-125 transform transition-all duration-300'>
                ❌
              </div>

            </div>
          </div>
        ))}
      </div>


    </div>
  )

}

export default DoctorsList;






