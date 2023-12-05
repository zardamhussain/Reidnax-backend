const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to DataBase..."))
  .catch((err) => console.error("Error💥", err));

const port = process.env.port || 8000;
const server = app.listen(port, () =>
  console.log(`Listening to port ${port}......`)
);
