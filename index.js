import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error connecting to database", error));

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(productRouter);

app.listen(7000, () => {
  console.log("Port 7000 is listening");
});
