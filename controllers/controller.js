const config = require("../config");
const request = require("request-promise");

const getEmp = async (req, res, next) => {
  console.log(`getEmp`);
  try {
    res.send({
      message: `Result OK. `,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = (req, res, next) => {
  var param = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(`checklogin: ${param.email} , ${param.password}`);
  console.log(`url api :${config.external_url}/login`);

  request({
    method: "POST",
    uri: config.external_url + "/login",
    headers: { "Content-Type": "application/json" },
    json: true,
    body: {
      email: param.email,
      password: param.password,
    },
  })
    .then((response) => {
      console.log("Sent");
      console.log(`result login: ${response.success} ,${response.token}`);

      if (response.success == true) {
        res.cookie("loggedin", "true", { maxAge: 900000 }); //write cookies. 15 min
        res.cookie("token", response.token, { maxAge: 900000 }); //write cookies. 15 min
        res.redirect("/"); //return to page.
      } else {
        res.status(400).send("Invalid");
      }
    })
    .catch((err) => {
      console.log("Error:", err.message);
      console.log({
        Error: err.message,
      });
    });

  try {
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = (req, res, next) => {
  console.log(`post logout: ${req.cookies.token}`);
  //console.log("url " + config.EXTERNAL_API + "/login");

  request({
    method: "GET",
    uri: config.external_url + "/logout",
    headers: {
      "Content-Type": "application/json",
    },
    json: true,
    body: {
      token: req.cookies.token,
    },
  })
    .then((response) => {
      console.log("Sent");

      console.log(`result logout: ${response.success} ,${response.message}`);

      if (response.success == true) {
        res.clearCookie("loggedin"); //clear
        res.clearCookie("token"); //clear
        res.redirect("/welcome"); //return to page.
      } else {
        res.status(400).send("Invalid");
      }
    })
    .catch((err) => {
      console.log("Error:", err.message);
      console.log({
        Error: err.message,
      });
    });

  try {
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getEmp,
  login,
  logout,
};
