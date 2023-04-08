let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://picsum.photos/id/237/200/200",
  },
];

export async function getAll() {
  return tweets;
}

export async function getByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export async function getById(id) {
  return tweets.find((t) => t.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  return (tweets = [tweet, ...tweets]);
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    return tweet;
  }
  return null;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
