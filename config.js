const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const {
  PORT,
  HOST,
  HOST_URL,
  EXTERNAL_API,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports = {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
  external_url: EXTERNAL_API,
  mysql_host: MYSQL_HOST,
  mysql_user: MYSQL_USER,
  mysql_password: MYSQL_PASSWORD,
  mysql_database: MYSQL_DATABASE,
};
