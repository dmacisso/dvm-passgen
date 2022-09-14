// Modules
const { app, BrowserWindow, ipcMain } = require('electron');

// include the Node.js 'path' module
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Create a new BrowserWindow when `app` is ready
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  ipcMain.handle('ping', () => 'pong');

  win.loadFile('renderer/main.html');
};

// Electron `app` is ready
app.whenReady().then(() => {
  createWindow();

  // for macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
