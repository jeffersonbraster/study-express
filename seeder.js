const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Carregar env variaveis
dotenv.config({ path: "./config/config.env" });

//Carregar models
const bootcamp = require("./models/Bootcamp");

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

//Importar dentro do mongodb
const importData = async () => {
  try {
    await bootcamp.create(bootcamps);

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
