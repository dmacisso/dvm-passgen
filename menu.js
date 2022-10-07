// Modules
const { Menu, shell } = require('electron');

// Booleans
const isMac = process.platform === 'darwin';

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
                    // click: createAboutWindow,
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
                label: 'About',
                // click: createAboutWindow,
              },
            ]
          : []),
      ],
    },
    // {
    //   label: 'Actions',
    //   submenu: [
    //     { label: 'DevTools', role: 'toggleDevTools' },
    //     { role: 'ToggleFullScreen' },
    //   ],
    // },
  ];

  // Create Mac app Menu
  if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });

  // Build menu

  let menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};
