let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
    //render "reminders" variable object with database.cindy.reminders
  },

  new: (req, res) => {
    res.render("reminder/create");
    //render this ejs page from views>reminder>create.ejs
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      //SEARCH above line shows the array.prototype.find() function
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
      //RESULT if search found matches go to above link
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
      //RESULT if search not found go to index link
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
    console.log("edit"); //not touching this on console!!!
  },

  update: (req, res) => {
    console.log("made it");
    console.log(req.params.id);
    //console.log(req.title);//undefined
    console.log(req.body);
     
        let reminder = {
        id: req.params.id + 10,
        title: req.body.title,
        description: req.body.description,
        completed: false,
      };
      database.cindy.reminders.push(reminder);//push is adding to the array
                                            //need something to adjust? the array
       //} //else {
       //     res.render("reminder/index", { reminders: database.cindy.reminders });
  
       //res.redirect("/reminders");
      //} 
  },
  
  delete: (req, res) => {
    // Implement this code
  },
};

module.exports = remindersController;
