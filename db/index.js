import pg from "pg";
import * as config from "../config.js";

const pool = new pg.Pool({
  user: config.heroku_user,
  host: config.heroku_host,
  database: config.heroku_database,
  password: config.heroku_password,
  port: config.heroku_port,
  ssl: { rejectUnauthorized: false}   
})

function query(text, params) {
    return pool.query(text, params )
}

export default query;