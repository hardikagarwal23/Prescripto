import express from "express";
import { addDoctor, adminDashboard, adminLogin, allApp, allDoctors, AppCancel} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability, removeDoctor } from "../controllers/doctorController.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.post('/remove-doctor', authAdmin, removeDoctor);
adminRouter.post('/all-appointments', authAdmin, allApp);
adminRouter.post('/cancel-appointment', authAdmin, AppCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter

