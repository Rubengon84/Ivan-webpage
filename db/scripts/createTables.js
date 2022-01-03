import query from "../index.js";

const sqlStrings = [
  `CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY, location TEXT, title TEXT, path TEXT);`,
  `CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, user_name TEXT, user_comments TEXT, id_photo INTEGER, FOREIGN KEY (id_photo) REFERENCES photos(id));`
];

async function createPhotoTable(string) {
  const res = await query (string);
  console.log(res);
} 

sqlStrings.forEach( string => createPhotoTable(string));