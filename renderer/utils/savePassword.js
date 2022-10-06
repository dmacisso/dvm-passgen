// const fs = require('fs');
// const path = require('path');
// const os = require('os');

// const chalk = require('chalk');
// console.log(os.homedir());



export const savePassword = (password) => {
  fs.open(path.join(os.homedir(), 'saved-pw', 'passwords.txt'), 'a', 666, (e, id) => {
    // fs.open(path.join(desktop, 'passwords.txt'), 'a', 666, (e, id) => {
    fs.write(id, password + os.EOL, null, 'utf-8', () => {
      fs.close(id, () => {
        console.log('Password saved to passwords.txt');
      });
    });
  });
};

// module.exports = savePassword
