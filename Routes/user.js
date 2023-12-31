import express from "express"
import { GetProfile, Logout, Register, login, register } from "../controller/UserCont.js";
import IsAuthenticated from "../middleware/IsAuthenticated.js";


const userRouter=express.Router();


userRouter.post('/signUp',register)

userRouter.get('/verify/:Token',Register)

userRouter.post('/login',login)
  
userRouter.get('/logout',IsAuthenticated,Logout)

userRouter.get('/GetUserProfile',IsAuthenticated,GetProfile)

  export default userRouter
  
