import express from "express"
import { GetProfile, Logout, login, register } from "../controller/userCont.js";
import IsAuthenticated from "../middleware/IsAuthenticated.js";


const userRouter=express.Router();


userRouter.post('/signUp',register)
  
  
userRouter.post('/login',login)
  
userRouter.get('/logout',IsAuthenticated,Logout)

userRouter.get('/GetUserProfile',IsAuthenticated,GetProfile)

  export default userRouter
  