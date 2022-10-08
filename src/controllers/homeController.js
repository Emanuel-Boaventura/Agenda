exports.index = async (req, res) => {
  if (req.session.user) {
    const userDates = req.session.user;
    return res.render("index", { userDates });
  }

  return res.redirect("/home");
};

exports.home = async (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  return res.render("home");
};
