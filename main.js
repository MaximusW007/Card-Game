const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Absolute path to preload script
      contextIsolation: true, // Secure context for renderer process
      enableRemoteModule: false, // Deprecated module, best practice to disable
    },
  });

  // Load the main HTML file
  mainWindow.loadFile('pages/index.html');

  // Open DevTools automatically (comment out if not needed)
  mainWindow.webContents.openDevTools();

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

  // Register a global shortcut for toggling DevTools (Ctrl+Shift+I)
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

// Recreate a window when the app is activated (macOS behavior)
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Unregister global shortcuts when the app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Debugging helpers to confirm process flow
console.log('Main process is running');
