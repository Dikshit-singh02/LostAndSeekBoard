import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Item } from "./models/itemmodel.js";
import { User } from "./models/usermodel.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/files', express.static("files"));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Routes

// GET all items
app.get("/item", async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send({ message: error.message });
  }
});

// POST create new item
app.post("/item", upload.single("image"), async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.title ||
      !req.body.description ||
      !req.file
    ) {
      return res.status(400).send({
        message: "All fields are required, including image upload"
      });
    }

    const newItem = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    };

    const item = await Item.create(newItem);
    return res.status(201).send(item);

  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// GET item by ID
app.get("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).send({ message: error.message });
  }
});

// PUT update item by ID (admin only)
app.put("/item/:id", authenticateToken, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.phoneno) updateData.phoneno = req.body.phoneno;
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.file) updateData.image = req.file.filename;

    const item = await Item.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send({ message: error.message });
  }
});

// DELETE item by ID (admin only)
app.delete("/item/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Item.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).send({ message: error.message });
  }
});

// POST login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Seed admin user
const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "dikshitsingh9973@gmail.com" });
    if (!existingAdmin) {
      const admin = new User({
        email: "dikshitsingh9973@gmail.com",
        password: "Dikshit@2002",
        role: "admin"
      });
      await admin.save();
      console.log("Admin user seeded successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected to local MongoDB database");
    await seedAdmin();
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
