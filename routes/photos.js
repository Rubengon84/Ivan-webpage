import express from "express";
import * as models from "../models/photos.js"

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  let photos = await models.getAllPhotos();
  res.json({ 
    succes: true,
    message: "here all the photos",
    payload:  photos            
  });
});

router.get("/comments", async function (req, res) {
  let comments = await models.getAllComments();
  res.json({ 
    succes: true,
    message: "here all the photos",
    payload:  comments            
  });
});

router.get("/:photoId", async function (req, res) {
  let id = Number(req.params.photoId);
  let photo = await models.getPhotoByID(id);
  res.json({
    succes: true, 
    message: `here the photo with id ${id}`,
    payload:  photo            
  });
});

router.post("/:photoId/comments", async function (req, res) {
  let photoId = Number(req.params.photoId);
  let comment = req.body;
  let commentCreated = await models.createComment(photoId, comment);
  res.json({ 
    succes: true,
    message: `here the comment`,
    payload:  commentCreated            
  });
});

router.get("/:photoId/comments", async function (req, res) {
  let photoId = Number(req.params.photoId);
  let comments = await models.getCommentsById(photoId);
  res.json({ 
    succes: true,
    message: `here all the comments for photo number ${photoId}`,
    payload:  comments           
  });
});


export default router;
