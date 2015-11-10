Presentation
============
Le serveur de joystick permet d'cquerir les mouvbement Joystick
et de le distriuer a des abonnés par WebSockets

Le joystick USB doit etre reconnue comme gamepad par windows, et 
par ChromeChormium (Html5).
(peripherique HID, voir panneau de controle/periphoerique/jeux...)

la distribution par webseocket permet a des clients ne gerant pas le joysctick 
(typiquement IE11) de recevoir les evenements de celui-ci.

Installation
============
A) node.js
> installation node.msi:
 https://nodejs.org/dist/v5.0.0/node-v5.0.0-x64.msi et

 
B) Electron
Installer un projet Electon, puis dans celui-ci, installer les dependances: 
> git clone https://github.com/atom/electron-quick-start
> cd electron-quick-start
> npm  install

C) application
> git clone https://github.com/glurp/gamepad-ws
> cd gamepad-ws
> npm install ws

Mode d'emploi
=============
> cd gamepad-ws
> npm start

le client doit se connecter en localhost:1901 (numero de port en 
appele de initWebSocket() dans init())
Le message transmis est :
> [100,101,100,[0,0,0,0,0,0],8,838] at 838
> [ X,Y, Z , liste_buttons_state , numero-message , date-emission-ms ]
avec:
    X,Y : position du JS
    Z  :  zoom (rotation du joystick)
    boutons: liste des boutons dispinible sur le joystick , 1 pour activé, 0 pour repos
    numero-message  : pour detecter les doublons
    date-emission-ms : pour calculer le retard temporelle dans la transmission
    
TODO
====
En mode iconifié, l'appclication n'envoie que tres peut de message,
donc il faut forcer la desiconification de l'application (ou faure disparaitre
l'onglet de l'appli dans la barre de tache).


Developpement
==============

La Fenetre debug peut etre activé dès le lancement en appelent
mainWindow.webContents.openDevTools() dans la main.js

