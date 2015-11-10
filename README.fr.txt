Présentation
============
Le serveur de joystick permet d'acquérir les mouvements Joystick
et de le distribuer à des abonnés par WebSockets.

Testé pour Windows.
Devrait fonctionner partout ou Electron est disponible.

Le joystick USB doit être reconnu comme gamepad par l'OS, et  par Chrome/Chormium (HTML 5).
(Périphérique HID/Xinput, voir panneau de contrôle/périphérique/jeux...)

La distribution par webSocket permet à des clients ne gérant pas le joystick 
(typiquement IE11) de recevoir les événements de celui-ci.

Installation
============
A) node.js
> installation node.msi:
 https://nodejs.org/dist/v5.0.0/node-v5.0.0-x64.msi et

 
B) Electron
Installer un projet Electon, puis dans celui-ci, installer les dépendances: 
> git clone https://github.com/atom/electron-quick-start
> cd electron-quick-start
> npm  install

C) application
> git clone https://github.com/glurp/joy2
> cd joy2
> npm  install
> npm install ws

Mode d'emploi
=============
> cd joy2
> npm start

le client doit se connecter en ws://localhost:1901 (numéro de port en 
appel de initWebSocket() dans init())

Le message transmis est :
```
> [100,101,100,[0,0,0,0,0,0],8,838] at 838
> [ X,Y, Z , liste_buttons_state , numero-message , date-emission-ms ]
```
avec:
*    X,Y : position du JS
*    Z  :  zoom (rotation du joystick)
*    boutons: liste des boutons disponible sur le joystick , 1 pour activé, 0 pour repos
*    numéro-message  : pour détecter les doublons
*    date-émission-ms : pour calculer le retard temporel dans la transmission
    
TODO
====
En mode iconifié, l'application n'envoie que très peu de messages,
donc il faut forcer la desiconification de l'application (ou faire disparaitre
l'onglet de l'appli dans la barre de tache).


Développement
==============

La Fenetre debug peut être activé dès le lancement en appelant
mainWindow.webContents.openDevTools() dans la main.js

