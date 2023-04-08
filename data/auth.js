import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

let accounts = [];

export async function create({ username, password, name, email, url }) {
  const account = {
    id: uuidv4(),
    username,
    password,
    name,
    email,
    url,
  };
  accounts.push(account);
  const token = jwt.sign(
    {},
    "b7747dbd331c8e312e3a48210bfa2c50a52fb71dbc74e629fd975884326a3ace",
    {
      algorithm: "HS256",
      expiresIn: "1m",
    }
  );
  return { token, username };
}

export async function validate({ username, password }) {
  const filterAccount = accounts.filter(
    (account) => account.username === username
  );
  if (Array.isArray(filterAccount) && filterAccount.length > 0) {
    if (filterAccount[0].password === password) {
      const token = jwt.sign(
        {},
        "b7747dbd331c8e312e3a48210bfa2c50a52fb71dbc74e629fd975884326a3ace",
        {
          algorithm: "HS256",
          expiresIn: "1m",
        }
      );
      return { token, username };
    }
  }
  return {
    errorMessage: "로그인 실패",
  };
}
