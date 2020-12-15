const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");

//@desc   Get all reviews
//@route  GET /api/v1/reviews
//@route  GET /api/v1/bootscamps/:bootcampId/reviews
//@access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc   Get single review
//@route  GET /api/v1/reviews/:id
//@route  GET /api/v1/bootscamps/:bootcampId/reviews
//@access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await (await Review.findById(req.params.id)).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(new ErrorResponse("Review não encontrado", 404));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});
