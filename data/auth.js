import { v4 as uuidv4 } from "uuid";

let users = [
  {
    id: "1",
    username: "bob",
    password: "aaaa",
    name: "Bob",
    email: "bob@gmail.com",
    url: "",
  },
  {
    id: "2",
    username: "ellie",
    password: "aaaa",
    name: "Ellie",
    email: "ellie@gmail.com",
    url: "",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: uuidv4() };
  users.push(created);
  return created.id;
}

export async function findById(userId) {
  return users.find((user) => user.id === userId);
}
