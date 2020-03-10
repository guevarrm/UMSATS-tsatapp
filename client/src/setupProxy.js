const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/api", "/auth/google", "/sat/login", "/sat/getInfo"], {
      target: "http://localhost:5000"
    })
  );
};
