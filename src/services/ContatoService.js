const { UserModel } = require("../schemas/user");
const validator = require("validator");

class ContatoService {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async addContact(id) {
    this.valida();

    if (this.errors.length > 0) return;

    this.user = await UserModel.findByIdAndUpdate(
      id,
      {
        $push: { contatos: this.body },
      },
      { new: true }
    );
  }

  async buscaContato(idUsuario, idContato) {
    const contato = await UserModel.findOne(
      { _id: idUsuario },
      {
        contatos: { $elemMatch: { _id: idContato } },
      }
    );
    return contato;
  }

  async editaContato(idUsuario, idContato) {
    this.valida();

    if (this.errors.length > 0) return;

    this.user = await UserModel.findOneAndUpdate(
      { _id: idUsuario, "contatos._id": idContato },
      {
        $set: { "contatos.$": this.body },
      },
      { new: true }
    );
  }

  async delete(idUsuario, idContato) {
    this.user = await UserModel.findOneAndUpdate(
      {
        _id: idUsuario,
      },
      {
        $pull: {
          contatos: { _id: idContato },
        },
      },
      { new: true }
    );
  }

  valida() {
    this.cleanUP();
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail inválido.");
    }

    if (!this.body.nome) {
      this.errors.push("Nome é um campo obrigatório.");
    }

    if (!this.body.email && !this.body.telefone) {
      this.errors.push(
        "Pelo menos um campo deve ser preenchido: e-mail ou telefone."
      );
    }
  }

  cleanUP() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }
}

module.exports = ContatoService;
