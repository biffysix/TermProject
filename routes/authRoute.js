const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
     passport.authenticate("local", {
     successRedirect: "/",
     failureRedirect: "/auth/login",
    // failureFlash: true,
   })
  
);


  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  });

  module.exports = router;