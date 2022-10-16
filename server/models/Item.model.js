const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    description: String
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;