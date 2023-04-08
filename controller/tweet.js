// 로직이 변경되어야 한다 controller
import * as tweetReopository from "../data/tweet.js";
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
  const { text, name, username } = req.body;
  const tweet = await tweetReopository.create(text, name, username);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetReopository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet by ${id} not found` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  await tweetReopository.remove(id);
  res.sendStatus(204);
}
