const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//rotas protegidas
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //  else if(req.cookies.token) {
  //   token = req.cookies.token
  // }
  //make sure token exist
  if (!token) {
    return next(
      new ErrorResponse("Sem autorização para acessar sua solicitação.", 401)
    );
  }

  try {
    //verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    new ErrorResponse("Sem autorização para acessar sua solicitação.", 401);
  }
});

//Grand access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} não está authorizado para acessar essa requisição.`,
          403
        )
      );
    }
    next();
  };
};
