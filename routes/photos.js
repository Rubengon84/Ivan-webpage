import express from "express";
import * as models from "../models/photos.js"

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️" });
});

export default router;
