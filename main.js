/*=======================================================================
 Main.js : point d'antrée de l'application Electron.
 voir : https://github.com/atom/electron/blob/master/docs/api
 
=======================================================================*/

const {app, BrowserWindow, IpcRenderer} = require('electron')
var mainWindow = null;
var configWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  if (app.dock && app.dock.hide) 
      app.dock.hide();
  mainWindow = new BrowserWindow({
      x: -1270,y: 1,
      width: 230, height: 280, 
      frame: false,
      'title-bar-style': 'hidden',
      //transparent: true
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  
  //mainWindow.webContents.openDevTools();// DEBUG
  
  mainWindow.on('closed', function() { mainWindow = null; });
  
  IpcRenderer.on("showConfig", function() { 
      if (configWindow) {
          configWindow.close();
          return;
      }
      configWindow = new BrowserWindow({
          x: -1000,y: 100,
          width: 1000, height: 800, 
          show: true
      });
      configWindow.loadUrl('file://' + __dirname + '/config.html');
      configWindow.on('closed', function() { configWindow = null; });
  });
  IpcRenderer.on("hideConfig", function() { configWindow.hide();});
});
