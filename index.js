#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');
const { encrypt, decrypt } = require('./utils/crypto');

program.version('1.0.0').description('"Simple Password Generator"');
program
  .option('-l, --length <number>', 'length of password', '12')
  .option('-s, --save', 'save password to passwords.txt')
  .option('-nn, --no-numbers', 'no numbers in password')
  .option('-ns, --no-symbols', 'no symbols in password')
  .parse();

const { length, save, numbers, symbols } = program.opts();

//* Get Generated Password
const generatedPassword = createPassword(length, numbers, symbols);

//* Save to File
if (save) {
  savePassword(generatedPassword);
}

//* Copy to clipboard
clipboardy.writeSync(generatedPassword);

//* Output generated password
console.log(chalk.blue('Generated password: ') + chalk.bold(generatedPassword));
console.log(chalk.yellow('Password was copied to clipboard'));

//* encrypt
encrypted_password = encrypt(generatedPassword);
decrypted_password = decrypt(encrypted_password);

console.log(chalk.red('Encrypted Password ') + chalk.bold(encrypted_password));
