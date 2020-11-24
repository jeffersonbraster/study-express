const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Carregar env vars
dotenv.config({ path: "./config/config.env" });

//Conectar com o mongo
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

//Dev logging midleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Montar as rotas
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server abriu em modo ${process.env.NODE_ENV}, na porta ${PORT}`)
);

//pegando as rejeições
process.on("unhadledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //fechar server e fechar processo.
  server.close(() => process.exit(1));
});
