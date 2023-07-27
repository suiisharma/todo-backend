import express from "express";
import { config } from "dotenv";
import DbConnection from "./Dbconnect/DbConnection.js";
import userRouter from "./Routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRouter from "./Routes/task.js";
import ProfileRouter from "./Routes/profile.js";
import bodyParser from "body-parser";

config({
  path: "./Data/config.env",
});

const app = express();
DbConnection();
// middlewares
app.use(bodyParser.json()); // to use json in application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.frontend_url],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.get('/Hello',(req,res)=>{
res.set('Content-Type', 'text/html');
res.send(Buffer.from(`<div><h1>Hi There.</h1><br/><h2>Thanks for calling on ${req.protocol+"://"+req.hostname+req.url}</h2></div>`))
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/profile", ProfileRouter);

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
