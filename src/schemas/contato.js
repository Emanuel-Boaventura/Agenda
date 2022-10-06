const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
});

const ContatoModel = mongoose.model("contato", ContatoSchema);

module.exports = {
  ContatoSchema,
  ContatoModel,
};
