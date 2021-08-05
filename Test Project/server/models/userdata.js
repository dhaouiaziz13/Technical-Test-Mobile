//this the schema for the users

const { Schema, model } = require("mongoose");

const UserdataSchema = new Schema({
  username: {
    type: "string",
    required: true,
  },
  useremail: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  status: {
    type: "string",
    default: "user",
  },
  autherRequest: {
    type: "string",
    default: "none",
  },
});

const User = model("users", UserdataSchema);

module.exports = User;
