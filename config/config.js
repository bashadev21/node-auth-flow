require('dotenv').config();
const mysql=require('mysql')

let port = process.env.PORT || 8080;

const pool=mysql.createConnection({
    host       : "localhost",
    user       : "root",
    password   : "",
    database   : "auth-flow"
  })

module.exports={
    port,
    pool
}