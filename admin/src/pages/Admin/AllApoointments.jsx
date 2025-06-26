import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { getlAllApps, appointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    getlAllApps();
  }, []);


  return (

    <div className='px-6 pb-6 w-[82vw]'>
      <p className="font-semibold text-black text-lg my-4">All Appointments</p>

      <div className='bg-white border rounded text-sm'>

        {/* Sticky Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-white font-semibold sticky drop-shadow-md'>
          <p className="text-center">*</p>
          <p className="text-center">Patient</p>
          <p className="text-center">Age</p>
          <p className="text-center whitespace-nowrap">Date & Time</p>
          <p className="text-center">Doctor</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Action</p>
        </div>

        <div className='overflow-y-auto max-h-[80vh]'>
          {

            appointments.map((item, index) => (
              <div
                key={index}
                className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b items-center'
              >
                <p className="text-center">{index + 1}</p>
                <div className='flex flex-col items-center'>
                  <img src={item.userData.image} alt='' className='w-12 h-12 rounded-full' />
                  <p className="text-center">{item.userData.name}</p>
                </div>
                <p className="text-center">{calculateAge(item.userData.dob)}</p>
                <p className="text-center">{`${slotDateFormat(item.slotDate)}, ${item.slotTime}`}</p>
                <p className="text-center">{item.docData.name}</p>
                <p className="text-center">{currency}{item.amount}{item.payment ? <span className='text-green-500'>(paid)</span> : ''}</p>
                <p className='grid place-items-center'>
                  {item.cancelled ?
                    <p className='text-red-400 font-medium'>Cancelled</p> :
                    <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer hover:opacity-75' alt='' />
                  }

                </p>
              </div>
            ))}
        </div>

      </div>
    </div>


  );
};

export default AllAppointments;
