// Modules
const { Menu, shell, BrowserWindow } = require('electron');

// Booleans
const isMac = process.platform === 'darwin';

// Create 'About' window
const createAboutWindow = () => {
  console.log('In About Window');
  aboutWindow = new BrowserWindow({
    title: 'About Password Generator',
    x: 150,
    y: 150,
    width: 300,
    height: 300,
  });

  // aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
  aboutWindow.loadFile('renderer/about.html');
};

// Module function to create main app menu
// Menu template

module.exports = () => {
  let template = [
    {
      role: 'fileMenu',
    },
    {
      role: 'editMenu',
    },
    {
      role: 'windowMenu',
    },
    {
      label: 'Actions',
      submenu: [
        { label: 'DevTools', role: 'toggleDevTools' },
        { role: 'ToggleFullScreen' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn more',
          click: () => {
            shell.openExternal(
              'https://github.com/stackacademytv/master-electron'
            );
          },
        },
        {
          label: 'Source Code',
          click: () => {
            shell.openExternal('https://github.com/dmacisso/dvm-passgen');
          },
        },
        ...(isMac
          ? [
              {
                label: app.name,
                submenu: [
                  {
                    label: About,
                    click: createAboutWindow,
                  },
                ],
              },
            ]
          : []),
        // {
        //   role: 'fileMenu',
        // },
        ...(!isMac
          ? [
              {
                label: 'About this application',
                click: createAboutWindow,
              },
            ]
          : []),
      ],
    },
  ];

  // Create Mac app Menu
  if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });

  // Build menu

  let menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};
