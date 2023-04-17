import mysql from "mysql2";
import { config } from "../config.js";

// export const pool = mysql.createPool({
//   host: config.db.host,
//   user: config.db.user,
//   database: config.db.database,
//   password: config.db.password,
// });

// export const db = pool.promise();

import { Sequelize } from "sequelize";

const { host, user, database, password } = config.db;
export const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});
