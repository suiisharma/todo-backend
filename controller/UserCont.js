import sendToken from "../Utils/Tokenkeeper.js";
import Response from "../Utils/response.js";
import User from "../models/UserScema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


export const isPasswordStrong = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return Response(res, 400, false, "Required fields can't be empty!");
    }

    let user = await User.findOne({ email });
    if (user) {
      return Response(res, 400, false, "User Already Exists!");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.Email_id}`,
        pass: `${process.env.Email_pass}`,
      },
    });
    const token = jwt.sign({name:name,email:email,password:password}, process.env.Email_secret_key);
    const link = process.env.server_link+ req.baseUrl + "/verify/" + token;
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          font-size: 24px;
          color: #007bff;
          margin-bottom: 20px;
        }
        .content {
          font-size: 16px;
          color: #333;
          margin-bottom: 30px;
        }
        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #007bff 0%, #00bfff 100%);
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: linear-gradient(135deg, #00bfff 0%, #007bff 100%);
        }
        .footer {
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Email Verification</div>
        <div class="content">
          <p>Hello,</p>
          <p>Please click the button below to verify your email address:</p>
          <div class="button-container">
            <a href="${link}" class="button">Verify Email</a>
          </div>
          <p>If you did not create an account on our website, you can ignore this email.</p>
        </div>
        <div class="footer">
          <p>Best regards,</p>
          <p>TaskTonic Team</p>
        </div>
      </div>
    </body>
    </html>    
`;
    const mailOptions = {
      from: `${process.env.Email_id}`,
      to: email,
      subject: "Message  from TaskTonic",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return Response(res, 400, false, "Some Error Occured!");
      } else {
        return Response(res, 200, true, "Check Your Email !");
      }
    });
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const Register = async (req, res) => {
  try {

    if (!req.params.Token) {
      return res.render('Invalid',{link:process.env.frontend_url})
    }

    const { name, email, password } = jwt.verify(req.params.Token,process.env.Email_secret_key)


    if (!(name && email && password)) {
      return res.render('Error',{link:process.env.frontend_url})
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.render('User',{link:process.env.frontend_url})
    }
    const hashed_password = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed_password });
    return  res.render('Create',{link:process.env.frontend_url})
  } catch (error) {
    res.render('Error',{link:process.env.frontend_url})
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return Response(res, 400, false, "Required fields can't be empty!");
    }
    
   if(!isPasswordStrong(password)){
    return Response(res,400,false,"Weak Password!")
   }


    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return Response(res, 403, false, "Please SignUp!");
    }
    const areEqual = await bcrypt.compare(password, user.password);
    if (areEqual) {
      return sendToken(user, res, 200, true, "Authenication Successful!");
    }
    Response(res, 404, false, "Input valid credentials!");
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const Logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("Token", " ", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.node_env === "development" ? "lax" : "none",
        secure: process.env.node_env === "development" ? false : true,
      })
      .json({
        success: true,
        message: "Logged out successfull!",
      });
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const GetProfile = (req, res) => {
  try {
    Response(res, 200, true, req.user);
  } catch (error) {
    Response(res, 404, false, "Some Error Occured!");
    console.log(error.message);
  }
};
