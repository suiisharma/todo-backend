import express from 'express'
import upload from '../Utils/upload.js';
import IsAuthenticated from '../middleware/IsAuthenticated.js';
import { DeleteProfilePic, GetProfilePic, UploadProfile } from '../controller/ProfileCont.js';

const ProfileRouter=express.Router();


ProfileRouter.post('/UploadProfile',IsAuthenticated,upload.single('file'),UploadProfile)

ProfileRouter.get('/GetProfile',IsAuthenticated,GetProfilePic)
 
ProfileRouter.delete('/RemoveProfilePic',IsAuthenticated,DeleteProfilePic)

export default ProfileRouter