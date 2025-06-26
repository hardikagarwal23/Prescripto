import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile, bookAppointment, myApp, cancelApp,paymentRazorPay, verifyPayment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/my-appointments',authUser,myApp)
userRouter.post('/cancel-appointment',authUser,cancelApp)
userRouter.post('/razorpay-payment',authUser,paymentRazorPay)
userRouter.post('/verify-payment',authUser,verifyPayment)

export default userRouter;