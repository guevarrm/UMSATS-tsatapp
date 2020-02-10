const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys');

require('./models/User');
require('./services/passport'); // no need to store variable

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());

// https://console.developers.google.com/

require('./routes/authRoutes')(app);
//mongoose.connect(keys.mogoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

 // localhost:5000
 // http://localhost:5000/auth/google/callback error fix

//update heroku:
// git add .
// git commit -m "<message>"
// git push heroku master
