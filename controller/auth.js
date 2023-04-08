// 로직이 변경되어야 한다 controller
import * as userRepository from "../data/auth.js";

const jwtSecretKey =
  "b7747dbd331c8e312e3a48210bfa2c50a52fb71dbc74e629fd975884326a3ace";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = await userRepository.create(
    req.body
  );
  res.status(201).json(response);
}

export async function login(req, res) {
  const response = await userRepository.validate(req.body);
  res.status(200).json(response);
}
