const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      icon: path.join(__dirname, 'Resources', 'Icon-win.ico'),
      contextIsolation: true, 
      enableRemoteModule: false,
    },
  });
  console.log('Resolved Icon Path:', path.join(__dirname, 'Resources', 'Icon-win.ico'));
  mainWindow.loadFile('pages/index.html');

  // Remove the default menu
  Menu.setApplicationMenu(null);

  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Create the main window when the app is ready
app.on('ready', () => {
  createMainWindow();
  globalShortcut.register('Control+Shift+I', () => {
    if (mainWindow) {
      mainWindow.webContents.toggleDevTools();
    }
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate a window when the app is activated
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Unregister global shortcuts when the app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
