const express = require("express");
const cors = require("cors");
const router = require("./src/routes");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🎉`);
});
