// 로직이 변경되어야 한다 controller
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInSec;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  // 등록된 username이 있는지 찾는다.
  const found = await userRepository.findByUsername(username);
  // username이 있다면 안내문구를 보내가 리턴한다.
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  // hash를 생성한다.
  const salt = bcrypt.genSaltSync(config.bcrypt.saltRounds);
  const hashed = await bcrypt.hash(password, salt);
  // hash를 포함하여 사용자를 생성한다.
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  //토큰을 생성한다.
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username, name: user.name });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: jwtExpiresInDays,
  });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    token: req.token,
    username: user.username,
    name: user.name,
    url: user.url,
  });
}
