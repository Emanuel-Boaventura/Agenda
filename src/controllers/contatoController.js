const ContatoService = require("../services/ContatoService");

exports.index = (req, res) => {
  res.render("contato", { contato: null });
};

exports.register = async (req, res) => {
  try {
    const contato = new ContatoService(req.body);
    await contato.addContact(req.session.user._id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/criaContato"));
      return;
    }

    req.flash("success", "Contato cadastrado com sucesso!");
    req.session.user = contato.user;
    req.session.save(() => res.redirect("/"));
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async function (req, res) {
  try {
    const contatoService = new ContatoService(req.body);
    let contato = await contatoService.buscaContato(
      req.session.user._id,
      req.params.id
    );
    contato = contato.contatos.shift();
    res.render("contato", { contato });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.edit = async function (req, res) {
  try {
    const contato = new ContatoService(req.body);
    await contato.editaContato(req.session.user._id, req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect(`/${req.params.id}`));
      return;
    }

    req.flash("success", "Contato editado com sucesso!");
    req.session.user = contato.user;
    req.session.save(() => res.redirect(`/`));

    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.delete = async function (req, res) {
  try {
    const contato = new ContatoService();
    await contato.delete(req.session.user._id, req.params.id);

    req.flash("success", "Contato apagado com sucesso!");
    req.session.user = contato.user;
    req.session.save(() => res.redirect(`/`));
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};
