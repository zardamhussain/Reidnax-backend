const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      unique: false,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true,
      trim: true,
      required: [true, "Please provide your email"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('graphs', {
    ref: 'Graph',
    foreignField: 'user',
    localField: '_id',
  });

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, realPass) {
  return await bcrypt.compare(candidatePass, realPass);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
