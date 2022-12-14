//utility.js

const request = require("request-promise");
const accessToken = ""; // put access token
const config = require("./config");

const student = {
  name: "", // replace with your full name.
  age: 19, // put your age.
  gender: "", // replace with your gender
  department: "CPE",
};

exports.findStudentbyId = function (student_id, cb) {
  //-- call external api
  request({
    method: "POST",
    uri: config.external_api,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    formData: {
      message: `HTTP Request :${data.student_id} `,
      student_id: student_id,
    },
  })
    .then((response) => {
      console.log("Sent");
      console.log({
        request: student_id,
        response: response,
      });

      cb(response);
    })
    .catch((err) => {
      console.log("Error:", err.message);
      console.log({
        Error: err.message,
      });
    });
};

exports.fakeStudentbyInfo = function (student_id, cb) {
  cb(student);
};
