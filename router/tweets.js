// 데이터베이스를 써야한다면
import express from "express";
import "express-async-errors";
import { body } from "express-validator";

import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("10자 이상으로 입력해주세요."),
  validate,
];

// GET /tweets
// GET /teets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweets
router.post("/", isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;
