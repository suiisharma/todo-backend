import jwt from "jsonwebtoken";
import Response from "../Utils/response.js";
import User from "../models/UserScema.js";

const IsAuthenticated=async(req,res,next)=>{
    try {
        
        const {Token}=req.cookies;
        if(!Token){
          return   Response(res,401,false,'Login first!')
        }
        const decodeData=jwt.verify(Token,process.env.Jwt_secret);
        const user= await User.findById({_id:decodeData._id});
        if(!user){
        return Response(res,400,false,'Some error occured !')
        }
        req.user=user
        next()
    } catch (error) {
        Response(res,401,false,'Authentication failed!')
    }
}


export default IsAuthenticated