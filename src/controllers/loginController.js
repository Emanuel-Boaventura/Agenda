const LoginService = require("../services/LoginService");

exports.index = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  return res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new LoginService(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Sua conta foi criada com sucesso.");
    req.session.save(() => {
      return res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new LoginService(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Login feito com sucesso.");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/home");
};
