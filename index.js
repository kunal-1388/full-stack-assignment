if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var express = require("express");
var app = express();
const dataModel = require("./models/dataModel");
const path = require("path");
const mongoose = require("mongoose");

const dburl = process.env.DB_URL;
main().catch((err) => console.log(err));

var db;
async function main() {
  db = await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(db.collections);
  // useUnifiedTopology: true;
  console.log("Mongoose connected!!");
}

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.render("/index.html");
});
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await dataModel.find({ reference: id }).sort({ timestamp: 1 });

  res.send(data);
  // const data=collection.find({reference:})
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
