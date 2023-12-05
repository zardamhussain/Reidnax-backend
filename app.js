const express = require("express");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
// const eventRouter = require('./routes/eventRoutes');
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));

if (process.env.Node_ENV === "Development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
