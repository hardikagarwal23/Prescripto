import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: 'Missing details' });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.json({ success: false, message: 'Please enter a strong password' });
    }

    if (!imageFile) {
      return res.json({ success: false, message: 'Doctor image is required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_LOGIN_EMAIL && password === process.env.ADMIN_LOGIN_PASSWORD) {
      // Issue JWT without expiration
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Please enter the correct email or password' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const allDoctors = async (req, res) => {
  try {

    const doctors = await doctorModel.find({}).select('-password')
    res.json({ success: true, doctors })

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

const allApp = async (req, res) => {
  try {
    const apps = await appointmentModel.find({}).sort({ _id: -1 }) // Find all appointments
    res.json({ success: true, message: "All appointments fetched successfully", apps });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


const AppCancel = async (req, res) => {
  try {

    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)


    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment canceled' })


  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const adminDashboard = async (req, res) => {
  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const today = new Date()
    const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    const appointments = await appointmentModel.find({})
    const appointmentslist = await appointmentModel.find({ slotDate: todayFormatted }).sort({ _id: -1 })

    const dashboardData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      todaysAppointments: appointmentslist,
      todayDate: todayFormatted
    }
    res.json({ success: true, dashboardData })

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
export { addDoctor, adminLogin, allDoctors, allApp, AppCancel, adminDashboard };
