import path from "path";
import Response from "../Utils/response.js";
import Profile from "../models/ProfileSchema.js"
import fs from 'fs'

const changeprofile=async(res,Path,name,ProfilePic)=>{
    try {
      fs.unlink(ProfilePic.Path,(err)=>{
       if(err){
        console.log(err.message);
        return Response(res,400,false,"Some Error Occured!")
       }
      })
      ProfilePic.Path=Path
      ProfilePic.name=name
      await  ProfilePic.save()
      Response(res,200,true,"Profile Updated Successfully!")
    } catch (error) {
      Response(res,400,false,"Some Error Occured!")
      console.log(error.message);
    }
}


export const UploadProfile=async(req,res)=>{
   try {
    if(!req.file){
      console.log("Multer Upload Failed!");
      return Response(res,400,false,"Some Error Occured!")
    }
     const Path=req.file.path
     const name=req.file.originalname
     if(!(Path&&name)){
      return   Response(res,400,false,"Required Fields Can't Be Empty!")
     }
     
     let ProfilePic=await Profile.findOne({userId:req.user._id});
     if(ProfilePic){
      return changeprofile(res,Path,name,ProfilePic)
     }
      
     ProfilePic=await Profile.create({Path,name:name,userId:req.user._id});

     Response(res,200,true,"Profile Updated Successfully!")
   } catch (error) {
      Response(res,400,false,"Some Error Occured!")
      console.log(error.message);
   }
}


export const GetProfilePic=async (req,res)=>{
  try {
    const ProfilePic=await Profile.findOne({userId:req.user._id})
     if(!ProfilePic){
      return Response(res,200,true,{UseGooglePic:true})
     }
   res.status(200).sendFile(ProfilePic.Path,{root:"."})
  } catch (error) {
    console.log(error.message);
    Response(res,400,false,'Some Error Occured!')
  }
}

export const DeleteProfilePic=async(req,res)=>{
 try {
  let profile=await Profile.findOne({userId:req.user._id})
  if(!profile){
    return Response(res,404,false,"Set Profile Pic First!")
  }
  fs.unlink(profile.Path,(err)=>{
    if(err){
     console.log(err.message);
     return Response(res,400,false,"Some Error Occured!")
    }
   })
   profile= await Profile.findOneAndDelete({userId:req.user._id})
  Response(res,200,true,"Profile Pic Removed Successfully!")
 } catch (error) {
   console.log(error.message);
   Response(res,400,false,"Some Error Occured!")
 }
}



