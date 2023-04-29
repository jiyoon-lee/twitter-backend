import MongoDb from "mongodb";
import { getTweets } from "../database/database.js";

const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getTweets().find({}).sort({ createdAt: -1 }).toArray().then(mapTweets);
}

export async function getByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, { id: userId, name, username, url }) {
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet) //
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) }, //
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

const mapTweets = (tweets) => {
  return tweets.map(mapOptionalTweet);
};

const mapOptionalTweet = (tweet) => {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
};
