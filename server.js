const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/blood_donation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Donor Schema
const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodGroup: String,
  city: String,
  phone: String
});
const Donor = mongoose.model("Donor", donorSchema);

// Request Schema
const requestSchema = new mongoose.Schema({
  patientName: String,
  hospital: String,
  bloodGroup: String,
  city: String,
  phone: String,
  urgency: String
});
const Request = mongoose.model("Request", requestSchema);

// Routes
app.post("/api/donors", async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json({ message: "Donor Registered Successfully!" });
});

app.get("/api/donors", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

app.post("/api/requests", async (req, res) => {
  const request = new Request(req.body);
  await request.save();
  res.json({ message: "Blood Request Submitted!" });
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
