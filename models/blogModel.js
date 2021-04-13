const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  tags: { type: [String]},
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

module.exports = mongoose.model("Blog", Schema);
