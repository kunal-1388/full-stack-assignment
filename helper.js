if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const path = require("path");
const fs = require("fs");
const metrics = require("./demo.json");
const dataModel = require("./models/dataModel");

const mongoose = require("mongoose");

const dburl = process.env.DB_URL;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // useUnifiedTopology: true;
  console.log("Mongoose connected!!");
}

metrics.forEach(async function (element) {
  const id = element._id;
  element.data.forEach(async function (ele) {
    try {
      const newObj = await new dataModel({
        ...ele,
        reference: id,
      });
      await newObj.save();
    } catch (error) {
      console.log(error);
    }
  });
});
