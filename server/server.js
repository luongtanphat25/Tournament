const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB databse connection established successfully");
});

const tournamentRouter = require("./routes/tournament");
const userRouter = require("./routes/user");

app.use("/tournaments", tournamentRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
