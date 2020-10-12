const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

const { users } = require("./state");

/* BEGIN - create routes here */
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//this route gets all users and because there is only one expression and we are using a arrow finction we dont need the curly brackets
app.get("/users/", (req, res) => {
  res.send(users);
  //add the user to the array
});

//get a user by their id
app.get("/users/:userId", (req, res) => {
  //const found = users.some((user) => user.id === parseInt(req.params.id));

  let userId = parseInt(req.params.userId);
  let user = users.find((user) => user.id === userId);

  res.send(user);

  // if (found) {
  //   res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  // } else {
  //   res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  // }
});

//post a user
app.post("/users/", (req, res) => {
  //create a new user object to add to array of users
  let user = req.body;
  user._id = users.length + 1;

  //add the user to the array
  users.push(user);
  //return the user
  res.send(users);
});

app.put("/users/:userId", (req, res) => {

  let userId = parseInt(req.params.userId);
  let payload = req.body;

  //look up user
  let user = users.find((user) => user.id === userId);

  //change value on the user

  Object.keys(payload).map(key => {
    user[key] = payload[key]
  })

  //return the update
  res.send(users);
});


//remove the user from users
app.delete("/users/:userId", (req, res) => {
  let userId = parseInt(req.params.userId);
  let user = user.find(user => user._id === userId);

  user.isActive = false;

  res.send('delete')
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
