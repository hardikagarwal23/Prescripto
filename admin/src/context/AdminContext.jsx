import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('adminToken') || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([])
  const [dashboardData, setDashboardData] = useState(false)
  const getAllDoctors = async () => {
    try {

      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { Authorization: `Bearer ${aToken}` } })

      if (data.success) {
        setDoctors(data.doctors)
      }
      else { toast.error(data.message) }

    } catch (error) {
      toast.error(error.message)
    }
  }


  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {
        toast.success(data.message);
        getAllDoctors()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeDoctor = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/remove-doctor', { docId }, { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {
        toast.success(data.message);
        getAllDoctors()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [appointments, setAppointments] = useState([]);

  const getlAllApps = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-appointments', {}, { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {

        setAppointments(data.apps);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {
        toast.success(data.message)
        getlAllApps()
        getDashboardData()
      }
      else {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { Authorization: `Bearer ${aToken}` } });
      if (data.success) {
        setDashboardData(data.dashboardData)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    removeDoctor,
    getlAllApps,
    appointments,
    setAppointments,
    cancelAppointment,
    dashboardData,
    getDashboardData,
  };



  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;





