exports.index = async (req, res) => {
  const userDates = req.session.user;
  res.render("index", { userDates });
};

exports.home = async (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  return res.render("home");
};
