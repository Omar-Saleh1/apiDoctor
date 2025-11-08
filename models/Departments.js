import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: String 
});


const Departments = mongoose.model("Departments", departmentSchema);
export default Departments;