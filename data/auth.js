import { v4 as uuidv4 } from "uuid";
// import { db } from "../db/database.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: DataTypes.TEXT,
});

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
  // return db
  //   .execute("SELECT * FROM users WHERE username=?", [username])
  //   .then((result) => result[0][0]);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
  // const { username, password, name, email, url } = user;
  // return db
  //   .execute(
  //     "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
  //     [username, password, name, email, url]
  //   )
  //   .then((result) => result[0].insertId);
}

export async function findById(id) {
  return User.findByPk({ where: { id } });

  // return db
  //   .execute("SELECT * FROM users WHERE id=?", [id])
  //   .then((result) => result[0][0]);
}
