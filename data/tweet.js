// import { db } from "../db/database.js";

import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

export const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User);

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.userId, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";
export async function getAll() {
  // return db
  //   .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
  //   .then((result) => result[0]);
  return Tweet.findAll();
}

export async function getByUsername(username) {
  // return db
  //   .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
  //   .then((result) => result[0][0]);
  return Tweet.findOne({
    where: { username },
  });
}

export async function getById(id) {
  // return db
  //   .execute(`${SELECT_JOIN} WHERE id=?`, [id])
  //   .then((result) => getById(result[0].insertId));
  return Tweet.findByPk(id);
}

export async function create(text, userId) {
  // return db
  //   .execute("INSERT INTO tweets (text, createdAt, userid) VALUES (?,?,?)", [
  //     text,
  //     new Date(),
  //     username,
  //   ])
  //   .then((result) => result[0].insertId);
  return Tweet.create({ text, userId });
}

export async function update(id, text) {
  // return db
  //   .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
  //   .then(() => getById(id));
  return Tweet.update(
    { text },
    {
      where: {
        id,
      },
    }
  );
}

export async function remove(id) {
  // return db.execute("DELETE FROM tweets WHERE id=?", [id]);
  return Tweet.destroy({
    where: {
      id,
    },
  });
}
