const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();
const db = require("./models");
db.mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let dbConnection = db.mongoose.connection;
dbConnection.on("error", (error) => {
  console.log("Error connecting to database: ", error.message);
});
dbConnection.once("open", () => {
  console.log("connection to db established");
});

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/task", require("./routes/task.route"));
app.use("/auth", require("./routes/auth.route"));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});
app.get("/", (req, res) => {
  res.json({ message: "Server active." });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`);
});
