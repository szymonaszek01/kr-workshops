const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bearer = "Bearer ";
const secretKey = "test123";

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw `User (${username}) not found with provided username`;
  }

  const userId = user._doc._id;
  const passwordHash = user.password;
  let token = null;
  if (user._id && passwordHash) {
    await comparePassword(password, passwordHash).then((result) => {
      if (result.match) {
        token = createJwt({ userId: userId, roles: [user.role] });
        console.log(`user (${userId}) signed in successfully`);
      } else {
        const message = `provided password (${password}) for user (${userId}) is invalid`;
        console.log(message);
        throw message;
      }
    });
  }

  let authUser = { ...user._doc, token };
  delete authUser.password;
  
  return authUser;
};

const createJwt = ({ userId, roles }) => {
  const token = jwt.sign({ userId, roles }, secretKey, { expiresIn: "15m" });
  console.log(`generated jwt (${token}) for user (${userId})`);
  return token;
};

const encodePassword = async (password) => {
  let result = {};
  await bcrypt
    .hash(password, 10)
    .then((hash) => {
      console.log(`password encoded successfully (${password}) - ${hash}`);
      result = {
        password: password,
        hash: hash,
      };
    })
    .catch((error) => {
      console.log(`unable to encode password (${password}) - ${error}`);
      result = {
        password: password,
        error: error,
      };
    });
  return result;
};

const comparePassword = async (password, hash) => {
  let result = {};
  await bcrypt
    .compare(password, hash)
    .then((match) => {
      const message = `provided password (${password}) ${
        match ? "match" : "does not match"
      } to hash (${hash})`;
      console.log(message);
      result = {
        password: password,
        hash: hash,
        match: match,
      };
    })
    .catch((error) => {
      const message = `error occurred when comparing provided password (${password}) and hash (${hash}) - ${error}`;
      console.log(message);
      result = {
        password: password,
        hash: hash,
        match: false,
      };
    });

  return result;
};

const isValidJwt = (request) => {
  let result = {};
  const token = request.headers["authorization"];

  if (token && token.startsWith(bearer)) {
    jwt.verify(token.substring(7), secretKey, (error, decoded) => {
      if (error) {
        const message = "Jwt is not valid or expired";
        console.log(message);
        result = { error: message, valid: false };
      } else {
        const { userId, role } = decoded;
        result = { user: { id: userId, role: role }, valid: true };
      }
    });
  } else {
    result = {
      error: "Jwt not provided or invalid token signature",
      valid: false,
    };
  }
  return result;
};

module.exports = {
  login,
};
