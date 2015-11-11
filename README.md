Presentation
===
Electron application  for dispatch local Joystick data to WebSocket client 
Tested on Windows 7.
Should work on any environnement suppporting Electron.


The joystick USB should be configured as gamepad, et  seeing by  Chrome/Chormium (HTML 5).
(HID device)

Websocket distribution offer jouystick acces for any application which 
do not support HID ou XInput.

Usage
=== 

```
> npm install
> npm start

> firefox client_test.html
```

press a button on the  joystick to activate the server ...

License
====
MIT