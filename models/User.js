const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: [String, "Name is required"],
    required: true,
  },
  email: {
    type: [String, "Email required"],
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password Required"],
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  facebook: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
