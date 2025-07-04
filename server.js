import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import Url from "./models/url.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    console.log("🔍 Received URL:", url); 

    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(6);
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

    await Url.create({ shortId, originalUrl: url });

    const qrCode = await QRCode.toDataURL(shortUrl);

    res.json({ shortId, qrCode });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:shortId", async (req, res) => {
  try {
    const record = await Url.findOne({ shortId: req.params.shortId });
    if (record) {
      return res.redirect(record.originalUrl);
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
