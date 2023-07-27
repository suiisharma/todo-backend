import jwt from "jsonwebtoken";
import Response from "./response.js";

const sendToken = async (user, res, statuscode, success, message) => {
  try {
    const token = jwt.sign({ _id: user._id }, process.env.Jwt_secret);
    return res
      .status(statuscode)
      .cookie("Token", token, {
        httpOnly: true,
        maxage: 1000 * 60 * 15,
        sameSite: process.env.node_env === "development" ? "lax" : "none",
        secure: process.env.node_env === "development" ? false : true,
      })
      .json({
        success,
        message,
      });
  } catch (error) {
    console.log(error.message);
    Response(res,400,false,"Some Error Occured!")
  }
};

export default sendToken;
