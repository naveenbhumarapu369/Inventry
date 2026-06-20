<<<<<<< HEAD
module.exports = function initMiddleware(middleware) {
  return function runMiddleware(req, res) {
    return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  };
};

=======
module.exports = function initMiddleware(middleware) {
  return function runMiddleware(req, res) {
    return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  };
};

>>>>>>> a5be8771bc938d3240964aa89163d99f33271362
