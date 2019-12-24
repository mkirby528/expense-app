const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
    user: {
      type: String,
      required: true
    },
    category: {
      type: String ,
      required: true
    }
  });
  module.exports = User = mongoose.model("categories", CategorySchema);