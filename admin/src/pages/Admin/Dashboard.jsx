import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashboardData, cancelAppointment, dashboardData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  return dashboardData && (
    <div className='px-6 py-6'>

      <div className='flex gap-6'>

        <div className='flex items-center gap-x-6 shadow-md px-4 py-2 border rounded-md'>
          <img src={assets.doctor_icon} />

          <div>
            <p className='font-semibold'>{dashboardData.doctors}</p>
            <p className=''>Doctors</p>
          </div>

        </div>

        <div className='flex items-center gap-x-6 shadow-md px-2 py-2 border rounded-md'>
          <img src={assets.appointments_icon} />
          <div>
            <p className='font-semibold'>{dashboardData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-x-6 shadow-md px-4 py-2 border rounded-md'>
          <img src={assets.patients_icon} />
          <div>
            <p className='font-semibold'>{dashboardData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-8 border rounded-md '>
        <div className='flex gap-x-2 border-b px-2 py-4 shadow-md'>
          <img src={assets.list_icon} />
          <p className='font-semibold'>{`Today's Appointments (${slotDateFormat(dashboardData.todayDate)})`}</p>
        </div>


        <div className='overflow-y-auto max-h-[70vh]'>
          {

            dashboardData.todaysAppointments.map((item, index) => (
              <div key={index} className='flex justify-between items-center px-2 py-4 hover:bg-gray-100'>
                <div className='flex gap-x-2 items-center'>
                  <div><img src={item.userData.image} alt='' className='w-12 h-12 rounded-full' /></div>
                  <div>
                    <div>
                      <p className='font-semibold'>{item.userData.name}</p>

                      <p className='text-gray-600'>Booking of {item.docData.name} - {item.slotTime} {item.payment?<span className='text-green-500'>(paid)</span>:''}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {item.cancelled ?
                    <p className='text-red-400 font-medium'>Cancelled</p> :
                    <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer hover:opacity-75' alt='' />
                  }
                </div>

              </div>

            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Dashboard
