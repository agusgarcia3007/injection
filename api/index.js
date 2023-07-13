const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const router = require("./src/routes");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api", router);

const clientUrl = "https://injection-three.vercel.app";
const plusSign = chalk.cyan("[+]");
const message = `${plusSign} Server running on port ${PORT} 🎉 \n${plusSign} Interface: UP \n${plusSign} ${clientUrl}`;

app.listen(PORT, () => console.log(message));
