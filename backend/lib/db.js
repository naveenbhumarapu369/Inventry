const mongoose = require("mongoose");

let cached = global.__mongooseConn;

if (!cached) {
  cached = global.__mongooseConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => {
        cached.conn = mongooseInstance.connection;
        return cached.conn;
      });
  }
  return cached.promise;
}

module.exports = { connectDB };

