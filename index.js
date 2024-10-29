import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoutes.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(userRouter);

app.listen(7000, () => {
  console.log("Port 7000 is listening");
});
