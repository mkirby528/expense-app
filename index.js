const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");
const catergories = require("./routes/api/categories");
var cors = require("cors");
const path = require("path");

var options = {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  ,
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    },
  
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = process.env.mongo;

mongoose
  .connect(db, options)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.use("/api/categories", catergories);

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
