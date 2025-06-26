import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const MyappointmentS = () => {
  const { token, getMyApp, userAppointments, cancelApp, backendUrl } = useContext(AppContext);

  const navigate = useNavigate()

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelApp(appointmentId);
    }
  };

  const sortedAppointments = [...userAppointments].sort((a, b) => b.date - a.date);

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('/')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  };

  const appointmentRazorPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/razorpay-payment`, { appointmentId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        console.log(data)
        initPay(data.order);
      }
    } catch (error) {
      console.log('avinas')
      toast.error('Something went wrong. Please try again.');
    }

  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-payment', response, { headers: { Authorization: `Bearer ${token}` } });
          if (data.success) {
            console.log(data)
            getMyApp()
            navigate('/my-appointments')
          }
          else {
            toast.error(data.message || 'Payment verification failed');
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  useEffect(() => {
    getMyApp(); // Fetch appointments
  }, []);

  return (
    <div className="mt-4">
      <p className="text-xl font-medium text-gray-600 my-2">My Appointments</p>
      <hr />

      <div className="mt-4">
        {sortedAppointments && sortedAppointments.length > 0 ? (
          sortedAppointments.map((item, index) => (
            <div key={index} className={`flex flex-col gap-y-4 my-4`}>
              <div className={`flex gap-x-4 w-full `}>
                {/* Doctor Image */}
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="bg-blue-100 w-32"
                />
                {/* Doctor and Appointment Details */}
                <div>
                  <p className="font-semibold">{item.docData.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.docData.speciality}
                  </p>
                  <p className="font-medium text-gray-800">Address:</p>
                  <p className="text-sm text-gray-600">
                    {item.docData.address?.line1 || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.docData.address?.line2 || "N/A"}
                  </p>
                  <p className="font-medium text-gray-800">Date & Time:</p>
                  <p className="text-sm text-gray-600">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col ml-auto items-center justify-end gap-y-4 w-40">

                  {item.isCompleted && <button className=" border border-primary text-sm text-primary px-2 py-2 rounded w-full ">
                    Completed
                  </button>}

                  {item.payment && !item.isCompleted && <button className=" border border-primary text-sm text-primary px-2 py-2 rounded w-full">
                    Paid
                  </button>}

                  {!item.cancelled && !item.isCompleted && !item.payment && <button onClick={() => { appointmentRazorPay(item._id) }} className="hover:bg-primary hover:text-white transition-all duration-400 ease-in-out border border-gray text-sm text-gray-800 px-2 py-2 rounded w-full">
                    Pay Online
                  </button>}
                  {!item.cancelled && !item.isCompleted && <button onClick={() => handleCancel(item._id)} className="hover:bg-red-500 hover:text-white transition-all duration-400 ease-in-out border border-gray text-sm text-gray-800 px-2 py-2 rounded w-full">
                    Cancel Appointment
                  </button>}
                  {item.cancelled && !item.isCompleted && <button className=" border border-red-500 text-sm text-red-500 px-2 py-2 rounded w-full">
                    Appointment Canceled
                  </button>}
                </div>
              </div>
              {/* <hr className={`${Date.now() === item.slotDate ? 'bg-primary' : ''} h-[20vh] w-16`} /> */}
              <hr />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            You have no appointments.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyappointmentS;
