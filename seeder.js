const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Carregar env variaveis
dotenv.config({ path: "./config/config.env" });

//Carregar models
const bootcamp = require("./models/Bootcamp");
const course = require("./models/Course");
const user = require("./models/User");
const review = require("./models/Review");

//Conectar com o mongodb

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

//Importar dentro do mongodb
const importData = async () => {
  try {
    await bootcamp.create(bootcamps);
    await course.create(courses);
    await user.create(users);
    await review.create(reviews);

    console.log("Dados importados...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Deletar dados
const deleteData = async () => {
  try {
    await bootcamp.deleteMany();
    await course.deleteMany();
    await user.deleteMany();
    await review.deleteMany();

    console.log("Dados deletados...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
