let database = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    console.log("got to login: authController>login: ");
    res.render("auth/login");
  },

  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect("/login");
    } catch {
      res.redirect('/register')
   }
  },

  loginSubmit: (req, res) => {
    // implement
    //res.render("dashboard");
    console.log("logged in> authController>loginSubmit");
    console.log(req.body);
    // passport.authenticate("local", {
    //   successRedirect: "/reminders",
    //   failureRedirect: "/auth/login",
    //   failureFlash: true,
    //   });
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
