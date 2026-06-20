const cors = require("cors");
const initMiddleware = require("../lib/initMiddleware");

const handler = require("./auth/register");

const corsMiddleware = initMiddleware(
  cors({
    origin: true,
    credentials: true,
  })
);

module.exports = async function register(req, res) {
  await corsMiddleware(req, res);
  return handler(req, res);
};

