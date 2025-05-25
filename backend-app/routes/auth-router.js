const express = require("express");
const { login, refreshToken } = require("../services/auth-service");

const authRouter = express.Router();

authRouter.post("/auth/login", async (req, res) => {
  await login(req.body)
    .then((authUser) => res.json(authUser))
    .catch((error) => res.status(403).send({ error }));
});

authRouter.post("/auth/refresh-token", async (req, res) => {
  const { token } = req.body;
  await refreshToken(token)
    .then((token) => res.json(token))
    .catch((error) => res.status(403).send({ error }));
});

module.exports = authRouter;
