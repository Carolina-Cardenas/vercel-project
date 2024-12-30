import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
    unique: false,
  },

  surname: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
});
// Definir un modelo de ejemplo
const User = mongoose.model("User", UserSchema);

export default User;
