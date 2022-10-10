const fs = require('fs');
const path = require('path');
const os = require('os');
const { version, productName } = require('./package.json');
const Toastify = require('toastify-js');

// Modules
const { contextBridge, ipcRenderer, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  appversion: () => version,
  appname: () => productName,

  // ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld('fs', {
  open: () => fs.open(),
  close: () => fs.close(),
  write: () => fs.write(),
});

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })
