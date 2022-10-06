const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
//const { ContatoSchema } = require("./ContatoModel");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  contatos: [ContatoSchema],
});

const userModel = mongoose.model("user", UserSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validaLogin();
    if (this.errors.length > 0) return;
    this.user = await userModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("E-mail não cadastrado.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    }

    return this.user._id;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExist();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await userModel.create(this.body);
  }

  validaLogin() {
    this.cleanUP();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido.");
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Senha inválida.");
    }
  }

  async userExist() {
    this.user = await userModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("E-mail já cadastrado");
  }

  valida() {
    this.cleanUP();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido.");
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Senha precisar ter entre 3 e 50 caracteres.");
    }
  }

  cleanUP() {
    for (const key in this.body) {
      if (
        typeof this.body[key] !== "string" &&
        !Array.isArray(this.body[key])
      ) {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      contatos: this.body.contatos,
    };
  }
}

module.exports = { Login, UserSchema };
