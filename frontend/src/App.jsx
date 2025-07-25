import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import Myappointments from './pages/Myappointments';
import Appointment from './pages/Appointment';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';


const App = () => {

  const location = useLocation();

  const isLoginPage = location.pathname === '/login' || location.pathname === '/my-profile';

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />

      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctor />} />
        <Route path='/doctors/:speciality' element={<Doctor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/my-profile' element={<Myprofile />} />

        <Route path='/my-appointments' element={<Myappointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />

      </Routes>

      {/* Conditionally render Footer */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;
