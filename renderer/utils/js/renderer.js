import { createPassword } from './createPassword.js';

const len = document.getElementById('len'),
  pass = document.getElementById('password'),
  num = document.getElementById('numbers'),
  customSymbols = document.getElementById('customSymbols');
export let symbols = customSymbols.value;

const button = document.getElementById('submit-button');

button.addEventListener('click', (e) => {
  e.preventDefault();
  let length = +len.value;
  let numbers = num.checked;

  symbols = customSymbols.value;

  // console.log(length, numbers, symbols);

  // Get Generated Password
  const generatedPassword = createPassword(length, numbers, symbols);

  ipcRenderer.send('passwd', generatedPassword);

  pass.innerText = generatedPassword;
});

const information = document.getElementById('info');
information.innerText = `${versions.appname()} (v${versions.appversion()}) is  using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center',
    },
  });
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center',
    },
  });
}

ipcRenderer.on('success', (message) => {
  // console.log(message)
  alertSuccess(message);
});

// const func = async () => {
//   const response = await window.versions.ping();
//   console.log(response) // prints out 'pong'
// };

// func();
