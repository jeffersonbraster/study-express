const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Titulo obrigatorio."],
  },
  description: {
    type: String,
    required: [true, "Descrição obrigatorio."],
  },
  weeks: {
    type: String,
    required: [true, "Adicione um numero para Semanas."],
  },
  tuition: {
    type: String,
    required: [true, "valor da taxa obrigatorio."],
  },
  minimumSkill: {
    type: String,
    required: [true, "Diga suas skills."],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
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
});

module.exports = mongoose.model("Course", CourseSchema);
