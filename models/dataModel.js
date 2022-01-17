const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataModelSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  // measure: String,
  // dimensions: [
  //   {
  //     name: String,
  //     value: String,
  //   },
  // ],

  // data: [
  //   {
  original_value: Number,
  forecasted_value: Number,
  min_band: Number,
  max_band: Number,
  line_status: Number,
  timestamp: String,
  //   },
  // ],

  reference: String,
});

module.exports = mongoose.model("dataModel", dataModelSchema);
