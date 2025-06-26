import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const { userData, token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    navigate('/')
  };
  return (

    <div className="flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">

      <img onClick={() => { navigate('/') }} src={assets.logo} alt="logo" className='w-44 cursor-pointer' />

      <ul className='hidden md:flex items-start gap-5'>
        <NavLink to={'/'}>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
        </NavLink>

        <NavLink to={'/doctors'}>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
        </NavLink>

        <NavLink to={'/about'}>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
        </NavLink>

        <NavLink to={'/contact'}>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden rounded-full' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src={userData.image} alt='' className='w-10 h-10 object-cover rounded-full' />
            <img src={assets.dropdown_icon} alt='' className='w-2.5' />

            <div className='absolute top-0 right-0 pt-14 text-base font-medium test-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4  '>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer hover:scale-105 transition-transform duration-500'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer hover:scale-105 transition-transform duration-500'> My Appointments</p>
                <p onClick={() => {
                  logout()
                }} className='hover:text-black cursor-pointer hover:scale-105 transition-transform duration-500'>Logout</p></div>
            </div>

          </div> : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }

        <img onClick={() => { setShowMenu(true) }} src={assets.menu_icon} alt='' className='w-6 md:hidden' />



        <div className={`right-0 top-0 bg-white w-full h-full z-40 overflow-hidden transition-all duration-500 ease-in-out md:hidden fixed ${showMenu ? 'translate-x-0 ' : 'translate-x-full'}`}>
          <div className='flex justify-between p-6'>
            <img src={assets.logo} alt='' />
            <img onClick={() => { setShowMenu(false) }} src={assets.cross_icon} alt='' className='w-10 cursor-pointer transition-transform duration-500' />
          </div>

          <ul className='flex flex-col items-center mt-2'>
            <NavLink to={'/'} onClick={() => setShowMenu(false)}>
              <li className='py-1 px-1 text-xl'>HOME</li>
            </NavLink>

            <NavLink to={'/doctors'} onClick={() => setShowMenu(false)}>
              <li className='py-1 px-1 text-xl'>ALL DOCTORS</li>
            </NavLink>

            <NavLink to={'/about'} onClick={() => setShowMenu(false)}>
              <li className='py-1 px-1 text-xl'>ABOUT</li>
            </NavLink>

            <NavLink to={'/contact'} onClick={() => setShowMenu(false)}>
              <li className='py-1 px-1 text-xl'>CONTACT</li>
            </NavLink>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
