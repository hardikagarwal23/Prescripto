import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
        headers: { Authorization: `Bearer ${dToken}` }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { Authorization: `Bearer ${dToken}` } })
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dashboard data.");
    }
  };

  const cancelAppointmentByDoctor = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        toast.success(data.message)
        getAppointments()
        getDashData()
      }
      else {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const completeApp = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        toast.success(data.message)
        getAppointments()
        getDashData()
      }
      else {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        setProfileData(data.profileData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const value = {
    dToken,
    setDToken,
    backendUrl,
    cancelAppointmentByDoctor, completeApp,
    appointments, setAppointments, getAppointments, getDashData, dashData, setDashData,
    profileData, setProfileData, getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;


