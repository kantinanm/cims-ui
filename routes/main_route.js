const express = require("express");
const { getEmp, login, logout } = require("../controllers/controller");
var util = require("../utility");
const router = express.Router();

const authCheckMiddleware = (req, res, next) => {
  // Perform auth checking logic here, which you can attach
  // to any route.
  console.log("Middleware apply.");
  console.log(`${req.method} url:: ${req.url}`);

  if (true) {
    return res.redirect("/login");
  }

  next();
};
/*
router.use(function auth(req, res, next) {
  //console.log("Time: ", Date.now());
  // Perform auth checking logic here, which you can attach
  // to any route.
  console.log("Middleware apply.");
  console.log(`${req.method} url:: ${req.url}`);

  if (true) {
    return res.redirect("/login");
  }

  next();
});*/

router.get("/employee", getEmp);

// router.post('/student', addStudent);
// router.get('/student', getStudents);
// router.put('/student/:studentId', updateStudent);
// router.delete('/student/:studentId', deleteStudent);

router.get("/welcome", (req, res) =>
  res.send({
    error: false,
    message: "Welcome NodeJS, Express",
  })
);

router.post("/login", login);
router.get("/logout", logout);

/*router.post("/login", function (req, res) {
  var result = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(req.body);

  //res.json(result);

  res.redirect("/home");
});*/

router.get("/release", (req, res) => {
  res.status(400).send("error aria?");
});

router.get("/ok", (req, res) => {
  res.status(200).json({ status: true, result: " successful!" });
});

router.get("/student/:student_id", function (req, res) {
  util.fakeStudentbyInfo(req.params.student_id, function (result) {
    res.json(result);
  });
});

module.exports = {
  routes: router,
};
