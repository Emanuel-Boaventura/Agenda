const mongoose = require("mongoose");
const validator = require("validator");
const { UserSchema } = require("./LoginModel");

const UserModel = mongoose.model("user", UserSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async addContact(id) {
    this.valida();
    this.user = await UserModel.findByIdAndUpdate(
      id,
      {
        $push: { contatos: this.body },
      },
      { new: true }
    );
  }

  async editaContato(idContato) {
    this.valida();
    console.log("passei aqui1", idContato);
    this.user = await UserModel.findByIdAndUpdate(
      idContato,
      {
        $set: { contatos: this.body },
      },
      { new: true }
    );
    console.log(this.user);
  }

  valida() {
    console.log("Validação ainda não criada!");
  }

  async buscaPorId(id) {
    if (typeof id !== "string") return;
    const contato = await UserModel.findById(id);
    return contato;
  }
}

module.exports = Contato;
