const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

module.exports = mongoose.model("Category", Schema);
