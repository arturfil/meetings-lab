const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  google: {
    type: Boolean,
    default: false,
  },
  facebook: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { password, _id, __v, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);

// ccreate full crud with this
