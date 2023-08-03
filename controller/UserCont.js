import sendToken from "../Utils/Tokenkeeper.js";
import Response from "../Utils/response.js";
import User from "../models/UserScema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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
        user: "souravdalana@gmail.com",
        pass: "nmolxztiaijoamhu",
      },
    });

    const token = jwt.sign({name:name,email:email,password:password}, process.env.Email_secret_key);

    const link = process.env.server_link + "/verify/" + token;
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Title</title>
</head>
<body>
  <div>
  <p>Hello</p><br>
  <p>This is a Verification email from TaskTonic.</p><br>
  <p>Click the Below link within 30 minutes to register yourself!</p><br>
  <a href="${link}"></a>
  </div>
</body>
</html>
`;
    const mailOptions = {
      from: "souravdalana@gmail.com",
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
      return Response(res, 400, false, "Invalid Request!");
    }

    const { name, email, password } = jwt.verify(req.params.Token,process.env.Email_secret_key)

    
    if (!(name && email && password)) {
      return Response(res, 400, false, "Required fields can't be empty!");
    }
    let user = await User.findOne({ email });
    if (user) {
      return Response(res, 400, false, "User Already Exists!");
    }
    const hashed_password = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashed_password });
    return sendToken(user, res, 201, true, "User Created Successfully!");
  } catch (error) {
    Response(res, 400, false, "Some Error Occured!");
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return Response(res, 400, false, "Required fields can't be empty!");
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
