const mongoose = require("mongoose");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome obrigatorio."],
    unique: true,
    trim: true,
    maxlength: [50, "Nome está muito grande, até 50 caracteres."],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Descrição obrigatorio."],
    maxlength: [400, "Descrição está muito grande, até 50 caracteres."],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "use uma URL com HTTP ou HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "O número só pode ter no maximo 20 caracteres."],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Coloque um E-mail valido email",
    ],
  },
  address: {
    type: String,
    required: [true, "Coloque um endereço valido."],
  },
  location: {
    //GeoJSON point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAdderess: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating precisa de no minimo 1."],
    max: [10, "Rating maximo é 10."],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create bootcamp slug from the name
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
