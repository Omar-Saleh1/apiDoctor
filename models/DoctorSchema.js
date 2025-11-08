// import mongoose from "mongoose";

// const DoctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialty: { type: String, required: true },
//   image: { type: String },
//   description: String,
//   experienceYears: Number,
// });

// const Doctor = mongoose.model("Doctor", DoctorSchema);
// export default Doctor;
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
     name: String,
  specialty: String,
  image: String,
  description: String,
  experienceYears: Number
})



const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;