const express = require("express");
const { login } = require("../services/auth-service");

const authRouter = express.Router();

authRouter.post("/auth/login", async (req, res) => {
  await login(req.body)
    .then((authUser) => res.json(authUser))
    .catch((error) => res.status(403).send({ error }));
});

module.exports = authRouter;
