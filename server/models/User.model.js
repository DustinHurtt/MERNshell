const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: "Item" }]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;