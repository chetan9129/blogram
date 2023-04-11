const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
app.use("/api", userRouter);

//database
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useFindAndModify: false,
});
var connection = mongoose.connection;
connection.on("error", () => {
  console.log("Mongo DB connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB connection Successfull");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
