const mongoose = require("mongoose");
const { ContatoSchema } = require("./contato");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  contatos: [ContatoSchema],
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
