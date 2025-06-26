import { createContext } from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([])

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

  const [userData, setUserData] = useState(false)


  const [userAppointments, setUserAppointments] = useState([])


  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching doctors.");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setUserData(data.userData)

      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching doctors.");
    }
  }

  const getMyApp = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/my-appointments", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAppointments(data.userAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching your appointments.");
    }
  };

  const cancelApp = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Appointment canceled successfully.");
        getMyApp();
        getDoctorsData();

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while canceling the appointment.");
    }
  };


  useEffect(() => {
    if (token) {
      loadUserProfileData();
      getMyApp();
    }
    else { setUserData(false) }
  }, [token]);


  useEffect(() => {
    getDoctorsData();
  }, []);


  const value = {
    doctors,
    getDoctorsData,
    getMyApp, cancelApp,
    userAppointments,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData, setUserData, loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
