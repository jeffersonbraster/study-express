const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//Carregar env vars
dotenv.config({ path: "./config/config.env" });

//Conectar com o mongo
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const app = express();

//Body parser
app.use(express.json());

//Dev logging midleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//file upload
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Montar as rotas
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

//montando a classe de errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server abriu em modo ${process.env.NODE_ENV}, na porta ${PORT}`.yellow.bold
  )
);

//pegando as rejeições
process.on("unhadledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //fechar server e fechar processo.
  server.close(() => process.exit(1));
});
