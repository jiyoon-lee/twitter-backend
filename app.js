import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";

import { sequelize } from "./db/database.js";
import tweetsRoute from "./router/tweets.js";
import authRoute from "./router/auth.js";
import { initSocket } from "./connection/socket.js";
import { config } from "./config.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRoute);
app.use("/auth", authRoute);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// db.getConnection().then((connetion) => console.log(connetion));
sequelize.sync();
const server = app.listen(config.host.port);
initSocket(server);
