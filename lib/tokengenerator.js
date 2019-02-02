const jwt = require('jsonwebtoken');

  function tokenGenerator(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(token);
      });
    });
  }

  module.exports = tokenGenerator;