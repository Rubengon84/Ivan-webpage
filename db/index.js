import pg from "pg";

const pool = new pg.Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
  ssl: { rejectUnauthorized: false}   
})

function query(text, params) {
    return pool.query(text, params )
}

export default query;