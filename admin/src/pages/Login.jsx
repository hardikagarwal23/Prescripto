import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

        if (data.success) {
          localStorage.setItem('adminToken', data.token);
          setAToken(data.token);
          navigate('/admin-dashboard');
          
        } else {
          toast.error(data.message);
        }
      }

      else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
      console.error(error.response);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>E-mail</p>
          <input
            type="email"
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span className="text-primary cursor-pointer underline" onClick={() => setState('Doctor')}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span className="text-primary cursor-pointer underline" onClick={() => setState('Admin')}>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
