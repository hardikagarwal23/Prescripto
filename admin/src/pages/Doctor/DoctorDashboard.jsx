import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, cancelAppointmentByDoctor, completeApp, getDashData } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])


  return dashData && (
    <div className='px-6 py-6'>

      <div className='flex gap-6'>

        <div className='flex items-center gap-x-6 shadow-md px-4 py-2 border rounded-md'>
          <img src={assets.earning_icon} />

          <div>
            <p className='font-semibold'>{currency}{dashData.earnings}</p>
            <p className=''>Earnings</p>
          </div>

        </div>

        <div className='flex items-center gap-x-6 shadow-md px-2 py-2 border rounded-md'>
          <img src={assets.appointments_icon} />
          <div>
            <p className='font-semibold'>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-x-6 shadow-md px-4 py-2 border rounded-md'>
          <img src={assets.patients_icon} />
          <div>
            <p className='font-semibold'>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border rounded-md '>
        <div className='flex gap-x-2 border-b px-2 py-4 shadow-md'>
          <img src={assets.list_icon} />
          <p className='font-semibold'>{`Today's Appointments (${slotDateFormat(dashData.todayDate)})`}</p>
        </div>


        <div className='overflow-y-auto max-h-[70vh]'>
          {

            dashData.todaysAppointments.map((item, index) => (
              <div key={index} className='flex justify-between items-center px-2 py-4 hover:bg-gray-100'>
                <div className='flex gap-x-2 items-center'>
                  <div><img src={item.userData.image} alt='' className='w-12 h-12 rounded-full' /></div>
                  <div>
                    <div>
                      <p className='font-semibold'>{item.userData.name}</p>

                      <p className='text-gray-600'>{item.slotTime} - <span className="text-xs border border-primary px-1 rounded-full text-gray-700">
                        {item.payment ? 'Online' : 'CASH'}
                      </span> </p>
                    </div>
                  </div>
                </div>


                <div className="flex justify-end items-center ">
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

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard;

