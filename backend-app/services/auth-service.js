const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../consts/consts");

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw `User (${username}) not found with provided username`;
  }

  const userId = user.id;
  const passwordHash = user.password;

  const result = await comparePassword(password, passwordHash);
  if (result.match) {
    const token = createJwt({ userId: userId, roles: [user.role], expiresIn: '1m' });
    const refreshToken = createJwt({ userId: userId, roles: [user.role], expiresIn: '3m' });
    console.log(`user (${userId}) signed in successfully`);
    let authUser = { ...user._doc, token, refreshToken };
    delete authUser.password;

    return authUser;
  } else {
    const message = `provided password (${password}) for user (${user.username}) is invalid`;
    console.log(message);
    throw message;
  }
};

const refreshToken = async (token) => {
  if (!token) {
    return res.status(401).json({
      error: "Request does not contain token or token's signature is not valid",
    });
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, secretKey);
  } catch (error) {
    res.status(401).json({ error: "Jwt is not valid or expired" });
  }
  const { userId } = decodedToken;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw `User (${userId}) not found with provided id`;
  }

  const accessToken = createJwt({ userId, roles: [user.role], expiresIn: '1m' });
  console.log(`Token for user (${userId}) refreshed successfully`);

  return accessToken;
};

const createJwt = ({ userId, roles, expiresIn }) => {
  const token = jwt.sign({ userId, roles }, secretKey, { expiresIn });
  console.log(`generated jwt (${token}) for user (${userId})`);
  return token;
};

const encodePassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(`password encoded successfully (${password}) - ${hash}`);
    return {
      password: password,
      hash: hash,
    };
  } catch (error) {
    console.log(`unable to encode password (${password}) - ${error}`);
    return {
      password: password,
      error: error,
    };
  }
};

const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    const message = `provided password (${password}) ${
      match ? "match" : "does not match"
    } to hash (${hash})`;
    console.log(message);
    return {
      password,
      hash,
      match,
    };
  } catch (error) {
    const message = `error occurred when comparing provided password (${password}) and hash (${hash}) - ${error}`;
    console.log(message);
    return {
      password,
      hash,
      match: false,
    };
  }
};

module.exports = {
  login,
  refreshToken,
};
