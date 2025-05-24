require("dotenv").config(); // this loads .env variables into process.env

const express = require("express");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const Url = require("./models/url");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/urlshortner');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  const shortId = nanoid(6);

  await Url.create({ shortId, originalUrl: url });

  res.json({ shortId });
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const record = await Url.findOne({ shortId });

  if (record) {
    res.redirect(record.originalUrl);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
