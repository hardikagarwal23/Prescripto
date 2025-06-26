import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";


const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // Fetch and toggle availability
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availability changed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to change availability. Please try again later." });
    }
};

// Remove doctor
const removeDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        // Check if the doctor exists (optional)
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Delete the doctor
        await doctorModel.findByIdAndDelete(docId);
        res.json({ success: true, message: "Doctor removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to remove doctor. Please try again later." });
    }
};

// Get list of doctors
const doctorList = async (req, res) => {
    try {
        // Fetch all doctors, excluding sensitive fields
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to fetch doctors. Please try again later." });
    }
};


const loginDoctor = async (req, res) => {

    try {
        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
        else {
            const isMatch = await bcrypt.compare(password, doctor.password)
            if (isMatch) {
                const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
                return res.json({ success: true, token })
            }
            else {
                return res.json({ success: false, message: 'Invalid credentials' })
            }
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        else {
            return res.json({ success: false, message: 'mark failed' })
        }



    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}


const AppCancelByDoctor = async (req, res) => {
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

const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        const today = new Date()
        const todayFormatted = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        const todaysappointmentslist = await appointmentModel.find({ slotDate: todayFormatted, docId: docId })
        let earnings = 0
        let patients = []
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            todaysAppointments: todaysappointmentslist.slice().reverse(),
            todayDate: todayFormatted,

        }
        res.json({ success: true, dashData })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, {
            fees,
            available,
            address
        });


        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log("Backend Error:", error); // ✅ Log backend error
        res.json({ success: false, message: error.message });
    }
};


export { changeAvailability, removeDoctor, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, AppCancelByDoctor, doctorDashboard, doctorProfile, updateDoctorProfile };
