var spacetrack = require("spacetrack");
var util = require("util");

const passport = require("passport");

module.exports = app => {
  /*
  app.get("/sat/login", (req, res) => {

    console.log(req);
    res.send(req;
  });
  */

  app.get("/sat/login", (req, res) => {
    spacetrack.login({
      username: "d.jdeluz@hotmail.com",
      password: "thisisforumsats"
    });
    console.log("Logged in");
    res.redirect("/sat/getInfo");
  });

  app.get("/sat/getInfo", (req, res) => {
    spacetrack
      .get({
        type: "tle_latest",
        query: [
          { field: "NORAD_CAT_ID", condition: "25544,39166" },
          { field: "ORDINAL", condition: "1" }
        ],
        predicates: [
          "OBJECT_NAME",
          "EPOCH",
          "INCLINATION",
          "ARG_OF_PERICENTER",
          "RA_OF_ASC_NODE",
          "MEAN_ANOMALY",
          "ECCENTRICITY",
          "MEAN_MOTION"
        ]
      })
      .then(
        function(result) {
          res.send(util.inspect(result, { colors: true, depth: null }));
        },
        function(err) {
          console.error("error", err.stack);
        }
      );
    console.log("Recieved Info");
  });
};
