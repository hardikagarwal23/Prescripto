import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate();

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('adminToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white ">

      <div className='flex items-center gap-2 text-xs'>
        <img onClick={() => { navigate('/admin-dashboard') }} src={assets.admin_logo} alt="logo" className='w-44 cursor-pointer' />
        <p className=' px-2.5 py-0.5 border border-gray-500 text-gray-600 rounded-full '>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm rounded-full px-10 py-2'>Logout</button>
    </div>
  )
}

export default Navbar
