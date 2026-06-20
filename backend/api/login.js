const cors = require("cors");
const initMiddleware = require("../lib/initMiddleware");

const handler = require("./auth/login");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function login(req, res) {
  await corsMiddleware(req, res);
  return handler(req, res);
};

