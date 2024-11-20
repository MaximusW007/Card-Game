const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1900,
    height: 1200,
    webPreferences: {
      nodeIntegration: true, // Allows Node.js in your app
    },
  });

  mainWindow.loadFile('pages/index.html'); // Load the HTML file
  Menu.setApplicationMenu(null);
});
