Presentation
===
[Electron](https://github.com/atom/electron) application  for dispatch local Joystick data to WebSocket client 


Should work on any environnement suppporting Electron.

Tested on Windows 7.

The joystick USB should be configured as gamepad, et  seeing by  Chrome/Chormium (HTML 5).
(HID/Xinput device)

Websocket distribution offer jouystick acces for any application which 
do not support HID ou XInput.

Message is JSON.stringify of ```[axes,buttons,nomess,time_ms]```, with :
* **axes** : array of values of 7 axes, values are 0..200, 0 is 100
* **buttons** : buttons states of 12 buttons, values are 0 or 1
* **nomessage** : incremented for each message
* **time_ms** : timestamp of event (new Date().getTime() % 1000)

Example: 
```
[[100,100,100,100,100,100,100],[1,0,0,0,0,0,0,0,0,0,0,0],739,265]
```

Usage
=== 

```
> npm install
> npm start
or
> .\node_modules\.bin\electron.exe .

> firefox client_test.html
```

Press the button '1' on the  joystick to activate the server ...
(this is a html5 gamepad chrome requirement)

Files
===

* **main.js** : startup Electron : load index.html
* **index.html** : main page, virual pad in SVG, include joy.js
* **joy.js** : gamepad client, virtual and real, websocket server for js ditribution.
* **client_test.html** : can be invoked by a navigator for client websocket test.
* **config.html** : Webgl tester , quadcopter simulator :) can be use directly by a navigator, or in electron app by (button 4)+(Zoom max).

modules used:
*  **ws** for websocket server,
*  many many module for Electron  GUI : Chromium under Node.js.
   
License
====

MIT

Use three.js for apropos.

