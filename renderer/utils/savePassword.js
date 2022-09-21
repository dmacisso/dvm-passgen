const fs = require('fs');
// import fs from 'fs';
const path = require('path');
// import path from 'path';
const os = require('os');
// import os from 'os';

// const chalk = require('chalk');

export const savePassword = (password) => {
  fs.open(path.join(__dirname, '../', 'passwords.txt'), 'a', 666, (e, id) => {
    fs.write(id, password + os.EOL, null, 'utf-8', () => {
      fs.close(id, () => {
        console.log('Password saved to passwords.txt');
      });
    });
  });
};

// module.exports = savePassword
