const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost/user", {
    useNewUrlParser: true
  })
  .then(msg => {})
  .catch(err => console.log(err));

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String
});

app.use(bodyParser.text());
app.use(express.static("public"));

app.post("/", (req, res) => {
  let data = JSON.parse(req.body);
  let { name, email, password, address, city, state, zip, phone } = data;
  let newUser = new User({
    name,
    email,
    password,
    address,
    city,
    state,
    zip,
    phone
  });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
});

app.listen(3000, err => {
  err ? console.log(err) : console.log("Server listening on port 3000");
});
