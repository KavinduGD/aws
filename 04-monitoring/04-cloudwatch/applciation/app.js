require("dotenv").config();

const express = require("express");
const sendLog = require("./logger");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  await sendLog(`GET / called from ${req.ip}`);

  res.json({
    message: "Hello from Express!",
  });
});

app.get("/users", async (req, res) => {
  await sendLog(`GET /users called from ${req.ip}`);

  res.json([
    {
      id: 1,
      name: "John",
    },
  ]);
});

app.post("/login", async (req, res) => {
  const username = req.body.username || "Unknown";

  await sendLog(`Login attempt by ${username}`);

  res.json({
    success: true,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
