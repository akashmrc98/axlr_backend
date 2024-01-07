import fs from "fs";
import https from "https";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config";
import { loggerStream } from "./config";

import authRoutes from "./routes/auth.route";
import ProductRoutes from "./routes/products.route";

import UserServices from "./services/user/users.service";

const app = express();
const credentials = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

app.use(morgan("combined", { stream: loggerStream }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ message: "hello, welcome" }));
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/products", ProductRoutes);

const server = https.createServer(credentials, app);
server.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
      autoCreate: true,
      appName: "test",
      dbName: "test",
    })
    .then((res) => {
      UserServices.createAdmin();
      // ProductServices.run();
      console.log(`Server is running on http://localhost:${PORT}`);
    })
    .catch((err) => console.log(err));
});
