const passport = require("passport");
var spacetrack = require('spacetrack');
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api.logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {

    spacetrack.login({
      username: 'd.jdeluz@hotmail.com',
      password: 'thisisforumsats'
    });
    console.log(req.user);
    res.send(req.user);
  });
};
