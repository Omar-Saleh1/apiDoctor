import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true, 
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    dateOfBirth: {
      type: Date,
      required: false, 
    },
    phone: {
      type: String,
      required: false,
    },

    address: {
      type: String,
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true } // يضيف createdAt و updatedAt تلقائيًا
);

const User = mongoose.model("User", UserSchema);
export default User;
