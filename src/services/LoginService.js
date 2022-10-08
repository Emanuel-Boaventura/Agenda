const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../schemas/user");

class LoginService {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validaLogin();
    if (this.errors.length > 0) return;
    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("E-mail não cadastrado.");
      return;
    }

    const valido = await bcryptjs.compare(
      this.body.password,
      this.user.password
    );

    if (!valido) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExist();

    if (this.errors.length > 0) return;

    const salt = await bcryptjs.genSalt();
    this.body.password = await bcryptjs.hash(this.body.password, salt);

    this.user = await UserModel.create(this.body);
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
    this.user = await UserModel.findOne({ email: this.body.email });
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

module.exports = LoginService;
