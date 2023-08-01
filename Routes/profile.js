import express from 'express'
import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname))
  }
})
 const upload=multer(
    {
        storage:storage
    }
 )

import IsAuthenticated from '../middleware/IsAuthenticated.js';
import { DeleteProfilePic, GetProfilePic, UploadProfile } from '../controller/ProfileCont.js';

const ProfileRouter=express.Router();


ProfileRouter.post('/UploadProfile',IsAuthenticated,upload.single('file'),UploadProfile)

ProfileRouter.get('/GetProfile',IsAuthenticated,GetProfilePic)
 
ProfileRouter.delete('/RemoveProfilePic',IsAuthenticated,DeleteProfilePic)

export default ProfileRouter