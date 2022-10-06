const { UserModel } = require("../schemas/user");

class ContatoService {
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

  async editaContato(idUsuario, idContato) {
    this.valida();
    this.user = await UserModel.findOneAndUpdate(
      { _id: idUsuario, "contatos._id": idContato },
      {
        $set: { "contatos.$": this.body },
      },
      { new: true }
    );
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

module.exports = ContatoService;
