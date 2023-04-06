import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let tweets = [];

// get all tweets
// get all tweets for user’s username
app.get("/tweets", (req, res) => {
  if (req?.query?.username) {
    const filterTweets = tweets.filter(
      (tweet) => tweet.username === req.query.username
    );
    res.status(200).send(filterTweets);
  } else {
    res.status(200).send(tweets);
  }
});

// get tweet by id
app.get("/tweets/:id", (req, res) => {
  const filterTweets = tweets.filter((item) => item.id === req.params.id);
  res.status(200).send(filterTweets);
});

// creating new tweet
app.post("/tweets", (req, res) => {
  const config = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date(),
  };
  tweets.unshift(config);
  res.sendStatus(201);
});

// updating tweet
app.put("/tweets/:id", (req, res) => {
  const {
    params: { id },
    body: { text: newText },
  } = req;
  console.log(id, newText);
  tweets = tweets.map((tweet) => {
    if (tweet.id === id) {
      return {
        ...tweet,
        text: newText,
      };
    }
    return tweet;
  });
  res.sendStatus(200);
});

// deleting tweet
app.delete("/tweets/:id", (req, res) => {
  tweets = tweets.filter((tweet) => tweet.id !== req.params.id);
  res.sendStatus(204);
});

app.listen(8080);
