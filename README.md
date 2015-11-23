Presentation
===
Electron application  for dispatch local Joystick data to WebSocket client 



Should work on any environnement suppporting Electron.Tested on Windows 7.

The joystick USB should be configured as gamepad, et  seeing by  Chrome/Chormium (HTML 5).
(HID/Xinput device)

Websocket distribution offer jouystick acces for any application which 
do not support HID ou XInput.

Usage
=== 

```
> npm install
> npm start
or
> .\node_modules\.bin\electron.exe .

> firefox client_test.html
```

press a button on the  joystick to activate the server ...

Files
===

* **main.js** : startup Electron : load index.html
* **index.html** : main page, viruak pad in SVG, include joy.js
* **joy.js** : gamepad virtual and real, websocket server for js ditribution.
* **client_test.html** : can be invoked by a navigator for client websocket test.

modules used:
*  ws for a websocket server,
*  many many module for Electron  GUI : Chromium under Node.js.
   
License
====

MIT

Use three.js for apropos.

