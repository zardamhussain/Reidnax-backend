const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dataSchema = new mongoose.Schema(
  {
    labels: {
      type: [String],
      required: [true, "A user should have the labels"],
    },
    data: {
      type: [Number],
      required: [true, "Please write the data"],
      validate: {
        validator: function (val) {
          return val.length === this.labels.length;
        },
        message: "Labels and Data should be equal in Number",
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// dataSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "_id",
//   });
//   next();
// });

const Graph = mongoose.model("Graph", dataSchema);
module.exports = Graph;
