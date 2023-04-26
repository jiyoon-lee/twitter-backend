// 로직이 변경되어야 한다 controller
import { getSocketIO } from "../connection/socket.js";
import * as tweetReopository from "../data/tweet.js";
import * as userRepository from "../data/auth.js";
import { validationResult } from "express-validator";

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const data = await (username
    ? tweetReopository.getByUsername(username)
    : tweetReopository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweets = await tweetReopository.getById(id);
  if (tweets) {
    res.status(200).json(tweets);
  } else {
    res.status(404).json({ message: `Tweet by ${id} not found` });
  }
}

export async function createTweet(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { text, username } = req.body;
  const user = await userRepository.findByUsername(username);
  // const tweet = await tweetReopository.create(text, user.id);
  const tweet = await tweetReopository.create(text, user);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetReopository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await tweetReopository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetReopository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetReopository.remove(id);
  res.sendStatus(204);
}
