<<<<<<< HEAD
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

=======
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

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
