
//rafid
//Daniel 
// Michael

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");


require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
// lalalalallaa

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// localhost:5000 SERVER
// http://localhost:5000/auth/google/

// localhost:3000 CLIENT
// http://localhost:3000/auth/google/ -> proxy reroutes to ...:5000

//update heroku:
// git add .
// git commit -m "<message>"
// git push heroku master
