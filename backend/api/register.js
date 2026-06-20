<<<<<<< HEAD
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

=======
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

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
