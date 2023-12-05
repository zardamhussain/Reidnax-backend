const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const Data = require("./../models/dataModel");
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  const user = await User.findById(req.user.id).populate({ path: "graphs" });
  if (!user) {
    return next(new AppError("No document found by that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.getAllData = catchAsync(async (req, res, next) => {
  const data = await Data.find().populate({
    path: "user",
    select: "_id name",
  });
  if (!data) {
    return next(new AppError("No document found by that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});
