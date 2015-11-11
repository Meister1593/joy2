//=============================================== 
// WebSocket Server
//=============================================== 

var WebSocketServer = require('ws').Server;
var wss =null;
function initWebSocket(p) {
    wss = new WebSocketServer({ port: p });
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
          //message("ws","received message "+ message.data);
      });
    });
    wss.broadcast = function broadcast(data) {
      if (data.length==0) {
          message("ws","close all connections");
          wss.clients.forEach(function each(client) { client.close() });
          return;
      }
      message("ws","nbClients="+wss.clients.length);
      wss.clients.forEach(function each(client) {
        client.send(data,function ack(error) {message("ws","error sending : "+error.toString());});
      });
    };
    wss.on('close', function close(ws) {
      message("ws","closed");
    });
    //message("ws","websocket ready");
    return wss;
}
function broadcast(data) { wss.broadcast(data); }
//================================================

function message(id,txt) {
 var node=document.getElementById(id)
 if (node) node.innerHTML=txt;
}
function position(id,x,y) {
 var node=document.getElementById(id);
 if (node) {
   node.style.left=""+x+"px";
   node.style.top=""+y+"px";
 }
}
var oldText="";
var nbm=0;
function transmit(data) {
  text=data.toString();
  if (oldText===text) return;
  if (broadcast) {
    oldText=text;
    data[4]=nbm
    data[5]=( new Date().getTime() ) % 1000;
    nbm=(nbm+1)%1000;
    text=JSON.stringify(data);
    message("ws2","sending "+text + " at " + (( new Date().getTime())%1000));
    broadcast(text);
  }
}
var mouse=false;
function mousepush() { mouse=true; }
function mouserelease(event) { 
  mouse=false;
  position("cross",event.offsetX-5,event.offsetY-5);  
}
function mousemove(event) {
   if (! mouse) return(flse);
   event.stopPropagation()
   position("cross",-10000,-10000);
   //message("a1","mouse : " + event.offsetX + "/" + event.offsetY);
   transmit([event.offsetX,event.offsetY,0,[0,0,0,0,0,0],-100,0]);
   return(true);
}
//=============================================== 
// Gamepad Agent
//=============================================== 
function mloop() {
  try {
    loop(); 
  } catch(eee) {
    //console.log(eee);
    gpok=false;
  } 
} 
function loop() {
 if (! gpok) {
     message("title","navigator.gamepad unknown");
     var gps= (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads();
     message("title","Gamepad Ok, please Press something...  "+ gps.length);
     var gp=gps[0];
     message("title","Model : "+ gp.id)  ;
     gpok=true;
 }
 if (! gpok) return;
 
 // il faut relire la liste de gamepad: elle est dynamique (sous chrome)...
 gp=((navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads())[0];
 
 var str1="buttons states=";
 for (var ib=0;ib<6;ib++) str1=str1+" "+ (gp.buttons[ib].pressed ? ("<b>B"+(ib+1)+"</b>") : "B"+(ib+1))
 message("b1",str1);

 var vb=[0,0,0,0,0,0]
 for (var ib=0;ib<6;ib++) vb[ib]=gp.buttons[ib].pressed ? 1 : 0 ;

 //message("a1",""+Math.round(gp.axes[0]*1000));
 //message("a2",""+Math.round(gp.axes[1]*1000));
 //message("a3",""+Math.round(gp.axes[2]*1000));
 
 var x=1+gp.axes[0];
 var y=1+gp.axes[1];
 var z=1+gp.axes[2];
 position("cross",x*100-5,y*100-5);
 transmit([Math.round(x*100),Math.round(y*100),Math.round(z*100),vb,-100,0]);
}

var idi=null;
function init() {
 initWebSocket(1901);
 idi=setInterval(function() { mloop();},50);
};

function unload() {
  if (broadcast) {
    try {broadcast("");} catch(e) {}; 
  }
  if (idi) {
      clearInterval(idi);
      idi=null;
  }
}

