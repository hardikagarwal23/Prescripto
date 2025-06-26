import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const SideBar = () => {

    const {aToken} =useContext(AdminContext)
    const {dToken}=useContext(DoctorContext)
  return (
    <div className='border-r h-[100vh] w-32 md:w-72'>
      {
        aToken && <ul className='mt-6 flex flex-col text-gray-600 text-base'>

            <NavLink to={'/admin-dashboard'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10 h-12 ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`}>
                <img src={assets.home_icon} />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink to={'/all-appointments'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10  h-12 ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`} >
                <img src={assets.appointment_icon} />
                <p className='hidden md:block'>All Appointments</p>
            </NavLink>

            <NavLink to={'/add-doctor'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10 h-12  ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`}>
                <img src={assets.add_icon} />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>

            <NavLink to={'/doctor-list'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10  h-12  ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`}>
                <img src={assets.people_icon} />
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
      }
      {
        dToken && <ul className='mt-6 flex flex-col text-gray-600 text-base'>

            <NavLink to={'/doctor-dashboard'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10 h-12 ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`}>
                <img src={assets.home_icon} />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink to={'/doctor-appointments'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10  h-12 ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`} >
                <img src={assets.appointment_icon} />
                <p className='hidden md:block'>All Appointments</p>
            </NavLink>

            <NavLink to={'/doctor-profile'} className={({ isActive }) =>`flex items-center justify-start gap-x-3 px-10  h-12  ${isActive ? 'border-r-4 border-indigo-500 bg-[#F2F3FF]' : ''}`}>
                <img src={assets.people_icon} />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default SideBar
