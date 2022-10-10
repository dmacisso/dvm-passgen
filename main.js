const { encrypt, decrypt } = require('./crypto');
const fs = require('fs');
const os = require('os');
require('dotenv').config();
require('update-electron-app')();

const { version, productName } = require('./package.json');

// Modules
const { app, BrowserWindow, ipcMain, clipboard, shell } = require('electron');
const windowStateKeeper = require('electron-window-state');
const appMenu = require('./menu');

// Booleans
const isDev = process.env.NODE_ENV !== 'production';

// include the Node.js 'path' module
const path = require('path');
const { send } = require('process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Create a new BrowserWindow when `app` is ready
const createWindow = () => {
  // win state keeper
  let state = windowStateKeeper({ defaultWidth: 400, defaultHeight: 500 });
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Create main app Menu
  appMenu(win.webContents);

  // Open DevTools - Remove for PRODUCTION!
  // win.webContents.openDevTools({ mode: 'detach' });

  // Create destination folder if not exists
  const dest = path.join(app.getPath('home'), '/generated_passwords');
  const filename = 'passwords.txt';
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  // ipcMain.handle('ping', () => 'pong');
  ipcMain.on('passwd', (e, generatedPassword) => {
    console.log(generatedPassword);

    const encryptedPassword = encrypt(generatedPassword);
    console.log(encryptedPassword);

    // copy password to clipboard
    clipboard.writeText(generatedPassword);

    // save file to password.txt and alert success

    fs.open(path.join(dest, filename), 'a', 666, (e, id) => {
      fs.write(id, generatedPassword + os.EOL, null, 'utf-8', () => {
        fs.close(id, () => {
          console.log(`Password saved to ${dest}\\passwords.txt`);
          // const success = `Password saved to ${dest}\\password.txt`;
          const success = `Password saved to clipboard`;
          win.webContents.send('success', success);
          shell.openPath(dest);
        });
      });
    });
  });

  // Create main app Menu
  // appMenu(win.webContents);

  // Load index.html into the new BrowserWindow
  win.loadFile('renderer/main.html');

  // Manage new window state
  state.manage(win);
};

// Electron `app` is ready
app.whenReady().then(() => {
  // console.log(app.getPath('desktop'));
  // console.log(app.getPath('music'));
  // console.log(app.getPath('temp'));
  // console.log(app.getPath('userData'));
  // console.log(app.getPath('home'));

  createWindow();

  // for macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// let desk = app.getPath('desktop');
// ipcMain.handle('desktop', (desk) => {
//   send(desk);
// });

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
