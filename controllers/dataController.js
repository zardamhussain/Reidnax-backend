const Data = require('./../models/dataModel');
const catchAsync = require('./../utils/catchAsync')

exports.addData = catchAsync(async (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    const graphData = await Data.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: graphData,
      },
    });
  });