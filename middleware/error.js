const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  //log to console para desenvolvedores
  console.log(err);

  //mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongose duplicate key
  if (err.code === 11000) {
    const message = "Campo duplicado.";
    error = new ErrorResponse(message, 400);
  }

  //Mongose validation error
  if (err.name === "VlidationError") {
    const message = Object.values(err, errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
