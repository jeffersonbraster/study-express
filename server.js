const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Route files
const bootcamps = require("./routes/bootcamps");

//Carregar env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Dev logging midleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Montar as rotas
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server abriu em modo ${process.env.NODE_ENV}, na porta ${PORT}`)
);
