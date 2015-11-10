var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 500, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
