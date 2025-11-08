import express from "express";
const router = express.Router();
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "user",
      dateOfBirth,
      phone,
      address,
    } = req.body;

    if (!name || !email || !password || !phone || !address || !dateOfBirth )
      return res.status(400).json({ message: "All fields are required" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      dateOfBirth,
      phone,
      address,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        dateOfBirth: newUser.dateOfBirth,
        phone: newUser.phone,
        address: newUser.address,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    // ✅ إرجاع الرد
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error during signin:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


// ✅ Logout (ما دام مفيش كوكيز، نكتفي برسالة فقط)
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
