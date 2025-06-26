import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointmentByDoctor, completeApp } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    getAppointments()
  }, [dToken])
  return (
    <div className='px-6 pb-6 w-[80vw]'>
      <p className="font-semibold text-black text-lg my-4">All Appointments</p>
      <div className='bg-white border rounded text-sm'>

        {/* Sticky Header */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_3fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-white font-semibold sticky drop-shadow-md'>
          <p className="text-center">*</p>
          <p className="text-center">Patient</p>
          <p className="text-center">Age</p>
          <p className="text-center whitespace-nowrap">Date & Time</p>
          <p className="text-center">Payment</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        <div className='overflow-y-auto max-h-[80vh]'>
          {

            appointments.map((item, index) => (
              <div key={index} className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b ">

                <p className="max-sm:hidden text-center">{index + 1}</p>


                <div className="flex flex-col items-center">
                  <img src={item.userData.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <p className="">{item.userData.name}</p>
                </div>

                <div>
                  <p className="max-sm:hidden text-center">
                    {calculateAge(item.userData.dob)}
                  </p>
                </div>

                <p className='text-center'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                <div className='text-center'>
                  <p className="inline border border-primary px-2 rounded-full text-gray-700 ">
                    {item.payment ? 'Online' : 'CASH'}
                  </p>
                </div>

                <p className="text-gray-800 font-semibold text-center">{`${currency}${item.amount}`}</p>


                <div className="flex justify-center">
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium">Cancelled</p>
                  ) : item.isCompleted ? null : (
                    <img
                      onClick={() => cancelAppointmentByDoctor(item._id)}
                      src={assets.cancel_icon}
                      className="w-10 cursor-pointer hover:opacity-75"
                      alt="Cancel"
                    />
                  )}

                  {item.isCompleted ? (
                    <p className="text-green-500 font-medium">Completed</p>
                  ) : item.cancelled ? null : (
                    <img
                      onClick={() => completeApp(item._id)}
                      src={assets.tick_icon}
                      className="w-10 cursor-pointer hover:opacity-75"
                      alt="Complete"
                    />
                  )}
                </div>

              </div>

            ))}
        </div>

      </div>
    </div>
  )
}

export default DoctorAppointments;
