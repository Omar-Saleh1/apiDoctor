import express from "express";
import Departments from "../models/Departments.js";
import auth from "../auth/Middleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // لازم يكون المجلد موجود في نفس مستوى السيرفر
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// إضافة قسم جديد
router.post(
  "/addDepartments",
  auth("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name)
        return res.status(400).json({ message: "Name is required" });

      const department = await Departments.create({
        name,
        description,
        image: req.file ? req.file.filename : null,
      });

      res.status(201).json(department);
    } catch (error) {
      res.status(500).json({ message: "Failed to create department", error });
    }
  }
);
// جلب كل الأقسام
router.get("/allDepartments", async (req, res) => {
  try {
    const departments = await Departments.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments", error });
  }
});

// عد الأقسام
router.get("/count", async (req, res) => {
  try {
    const count = await Departments.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments count", error });
  }
});

export default router;
