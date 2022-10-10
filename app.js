//app.js
const express = require("express");
const MainRoutes = require("./routes/main_route");

const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config");

var app = express();

app.use(cors());
//app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

/** specify the directory from where to serve static assets such as JavaScript, CSS, images **/
app.use(express.static(path.join(__dirname, "public")));

app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use(
  "/jquery-ui",
  express.static(__dirname + "/node_modules/jquery-ui/dist/")
);
app.use(
  "/js-cookies",
  express.static(__dirname + "/node_modules/js-cookie/dist/")
);

/**
 Create my-route
**/
const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  if (request.cookies.loggedin == "true") {
    console.log("Yup! You are logged in!");
  }
  next();
};

app.use(requestLogger); //middleware

app.use(MainRoutes.routes); //use routes

app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/login", function (req, res) {
  res.sendFile("public/login.html", { root: __dirname });
});

var port = process.env.port || config.port;

console.log(" Port config: " + port);
console.log(" API URL: " + config.external_url);

app.listen(port, function () {
  console.log("Starting node.js on port " + port);
});
