const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const bycrypt = require('bcrypt');
const flash = require('express-flash');

// Middleware for express
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//test
app.get('/login', (req, res) => {
   res.render('login.ejs')

})

// Routes start here

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create); //submit button so app.POST

// Implement this yourself: update
app.post("/reminder/update/:id", reminderController.update); //update button so app.POST

// Implement this yourself: delete
app.post("/reminder/:id/delete", reminderController.delete); //delete button so app.POST

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/auth/register", authController.register);
app.get("/auth/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/auth/login", authController.loginSubmit);

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/auth",authRoute);


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser ????"
  );
});
