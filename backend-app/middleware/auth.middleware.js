const jwt = require("jsonwebtoken");
const { secretKey, bearer } = require("../consts/consts");

const isValidJwt = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || !token.startsWith(bearer)) {
    return res.status(401).json({
      error: "Request does not contain token or token's signature is not valid",
    });
  }

  try {
    req.decoded = jwt.verify(token.substring(7), secretKey);
    next();
  } catch (error) {
    res.status(401).json({ error: "Jwt is not valid or expired" });
  }
};

module.exports = {
  isValidJwt,
};
