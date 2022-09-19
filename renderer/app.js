// const createPassword = require('./utils/createPassword');
import { createPassword } from './utils/createPassword.js';
import { savePassword } from './utils/savePassword.js';
const clipboardy = require('clipboardy');

const len = document.getElementById('len'),
  pass = document.getElementById('password'),
  num = document.getElementById('numbers'),
  sym = document.getElementById('symbols'),
  clip = document.getElementById('clipboard'),
  button = document.getElementById('submit-button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  let length = +len.value;
  let numbers = num.checked;
  let symbols = sym.checked;
  let clipboard = clip.checked;
  console.log(length, numbers, symbols, clipboard);

  // Get Generated Password
  const generatedPassword = createPassword(length, numbers, symbols);
  
  
  //* Save to File
  if (clipboard === true) {
    savePassword(generatedPassword);
    //* Copy to clipboard
    clipboardy.writeSync(generatedPassword);
  }
  
  // console.log(generatedPassword);
  pass.innerText = generatedPassword;
});



const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const func = async () => {
//   const response = await window.versions.ping();
//   console.log(response) // prints out 'pong'
// };

// func();
