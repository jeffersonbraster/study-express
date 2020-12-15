const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Por gentileza, adicione um title para o review."],
    maxlength: 50,
  },

  text: {
    type: String,
    required: [true, "Por gentileza, adicione um texto para o review."],
  },

  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Por gentileza, adicione um rating de 1 até 10."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
