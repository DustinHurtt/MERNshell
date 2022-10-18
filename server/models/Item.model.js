const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    contributor: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;