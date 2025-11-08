import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./routes/user.js";
import Doctor from "./routes/doctors.js";
import Appointment from "./routes/appointment.js";
import Departments from "./routes/Departments.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/user", User);
app.use("/doctors", Doctor);
app.use("/appointments", Appointment);
app.use("/departments", Departments);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
