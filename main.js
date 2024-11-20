const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1900,
    height: 1200,
    webPreferences: {
      nodeIntegration: true, // Allows Node.js in your app
    },
  });

  mainWindow.loadFile('index.html'); // Load the HTML file
});
