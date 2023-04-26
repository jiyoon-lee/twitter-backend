import { getTweets } from "../database/database.js";

export async function getAll() {
  return getTweets()
    .find({})
    .sort({ createdAt: -1 })
    .forEach((element) => {
      console.log(element);
    });
}

export async function getByUsername(username) {
  return getTweets().findOne({
    where: { ["user.username"]: username },
  });
}

export async function getById(id) {
  return getTweets().findByPk(id);
}

export async function create(text, user) {
  return getTweets().insertOne({ text, createdAt: Date(), user });
}

export async function update(id, text) {
  return getTweets().updateOne(
    { where: { id } }, //
    [{ $set: { text } }] //
  );
}

export async function remove(id) {
  return getTweets().destroy({
    where: {
      id,
    },
  });
}
