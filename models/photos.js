import query from "../db/index.js";

export async function getAllPhotos() {
  const photos = await query(`
  SELECT * FROM photos;`);
  return photos.rows;
}

export async function getPhotoByID(id) {
  const photo = await query(`
  SELECT * FROM photos WHERE photos.id = $1;`, [id]);
  return photo.rows;
}

export async function getCommentById(id) {
  const comment = await query(`
  SELECT * FROM comments
  JOIN photos
  WHERE comments.id_photo = $1;`,[id]);
  return comment.rows;
}

export async function createComment(comment) {
  const {name, photoComment, id_photo} = comment;
  const comment = await query(`
  INSERT INTO comments comments (user_name, user_comments, id_photo) VALUES ($1 , $2, $3) RETURNING;`,[name, photoComment, id_photo]);
  return console.log(comment);
}