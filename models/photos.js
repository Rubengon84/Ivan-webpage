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

export async function getAllComments() {
  const comment = await query(`
  SELECT * FROM photos
  INNER JOIN comments
  ON photos.id = comments.id_Photo`);
  return comment.rows;
}

export async function getCommentsById(id) {
  const comment = await query(`
  SELECT user_name, user_comments FROM comments
  WHERE comments.id_photo = $1;`,[id]);
  return comment.rows;
}

export async function createComment(id_photo, comment) {
  //const {name, photoComment} = comment;
  const name = comment.name;
  const photoComment = comment.photoComment;
  const commentCreated = await query(`
  INSERT INTO comments (user_name, user_comments, id_photo) VALUES ($1 , $2, $3);`,[name, photoComment, id_photo]);
  //return console.log(commentCreated);
}