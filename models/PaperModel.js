const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  abstract: { type: String, required: true },
  url: { type: String, required: true },
  department: { type: String, required: true }, // New field
});

const PaperModel = new mongoose.model("Papers", paperSchema);
module.exports=PaperModel