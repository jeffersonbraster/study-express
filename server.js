const path = require("path");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
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
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

//Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//Dev logging midleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//file upload
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//xss prevent attack
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100,
});

app.use(limiter);

//prevent http param poluição
app.use(hpp());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Montar as rotas
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

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
