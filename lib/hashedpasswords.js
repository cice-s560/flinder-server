const bcrypt = require("bcrypt");

// Hash password
async function hashedPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password.toString(), 10, (err, hash) => {
        if (err) {
          reject(err);
          throw err;
        }
  
        return resolve(hash);
      });
    });
  }

  module.exports = hashedPassword;