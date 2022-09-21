// Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');

// include the Node.js 'path' module
const path = require('path');
const { send } = require('process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Create a new BrowserWindow when `app` is ready
const createWindow = () => {
  // win state keeper
  let state = windowStateKeeper({ defaultWidth: 600, defaultHeight: 500 });
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js')
    },
  });
  // ipcMain.handle('ping', () => 'pong');

  // Create main app Menu
  // appMenu(win.webContents);

  // Load index.html into the new BrowserWindow
  win.loadFile('renderer/main.html');

  // Open DevTools - Remove for PRODUCTION!
  // win.webContents.openDevTools({ mode: 'detach' });

  // Manage new window state
  state.manage(win);
};

// Electron `app` is ready
app.whenReady().then(() => {
  // console.log(app.getPath('desktop'));
  // console.log(app.getPath('music'));
  // console.log(app.getPath('temp'));
  // console.log(app.getPath('userData'));

  createWindow();

  // for macOS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

console.log(app.getPath('desktop'));

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
