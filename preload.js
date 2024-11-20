const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add specific APIs you want to expose to the renderer process
  sayHello: () => console.log('Hello from Electron!'),
});
