//============================================================================= 
// WebSocket Server
//============================================================================= 

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
        client.send(data,function ack(error) {
            message("ws","error sending : "+(error ? error.toString() : "..."));
            //client.close();
        });
      });
    };
    wss.on('close', function close(ws) {
      message("ws","closed");
    });
    //message("ws","websocket ready");
    return wss;
}
function broadcast(data) { wss.broadcast(data); }
//=============================================================================

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
    message("ws2",text + "<br>at " + (( new Date().getTime())%1000));
    broadcast(text);
    drawPadxy(data[0],data[1]);
    drawPadz(data[2]);
  }
}

//========================= X/Y par pad virtuel ==========================
function mooveall(event)  { return(true);}

var mouseXY=false;
function mousepush() { mouseXY=true; }
function mouserelease(event) { 
  mouseXY=false;
  transmit([100,100,100,[0,0,0,0,0,0],-100,0]);
}
function mousemove(event) {
   if (! mouseXY) return(false);
   event.preventDefault();   
   position("cross",event.offsetX,event.offsetY);
   //message("a1","mouse : " + event.offsetX + "/" + event.offsetY);
   x=Math.round((2*100.0*event.offsetX)/event.currentTarget.clientWidth  ) ;
   y=Math.round((2*100.0*event.offsetY)/event.currentTarget.clientHeight ) ;
   if (x>80 && x<120) x=100;
   if (y>80 && y<120) y=100;
   transmit([x,y,100,[0,0,0,0,0,0],-100,0]);
   return(true);
}
//========================= Zoom par pad virtuel ==========================
var mouseZ=false;
function zoommousepush() { mouseZ=true; }
function zoommouserelease(event) { 
   mouseZ=false;
   transmit([100,100,100,[0,0,0,0,0,0],-100,0]);
}
function zoommousemove(event) {
   if (! mouseZ) return(false);
   event.preventDefault();   
   position("cross",event.offsetX,event.offsetY);
   //message("a1","mouse : " + event.offsetX + "/" + event.offsetY);
   z=Math.round((2*100.0*event.offsetY)/event.currentTarget.clientHeight ) ;
   transmit([100,100,z,[0,0,0,0,0,0],-100,0]);
   return(true);
}

function button(no) {
    var vb=[0,0,0,0,0,0];
    vb[no%(vb.length)]=1
    transmit([100,100,100,vb,-100,0]);
}
function drawPadxy(x,y) {
    var marker= document.getElementById("xypos");
    var x0=Math.round(marker.parentElement.clientWidth  * x/200.0 ) ;
    var y0=Math.round(marker.parentElement.clientHeight * y/200.0) ;
    //marker.setAttribute("cx", x);
    //marker.setAttribute("cy", y);
    var arrow= document.getElementById("arrowxy");
    var triangle= document.getElementById("triangle");
    arrow.setAttribute("x2", x0);
    arrow.setAttribute("y2", y0);
    var vis=(x==100 && y==100) ? "hidden" : "visible";
    arrow.style.visibility= vis ;
    triangle.style.visibility= vis; 
}
function drawPadz(z) {
    var marker= document.getElementById("zpos");
    z=Math.round(marker.parentElement.clientHeight * z/200.0) ;
    x=Math.round(marker.parentElement.clientWidth  * 0.5 ) ;
    marker.setAttribute("cx", x);
    marker.setAttribute("cy", z);
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
     document.body.style.backgroundColor="#AA0000";
     message("title","Joystick Absent");
     var gps= (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads();
     message("title","Press PRESET1");
     var gp=gps[0];
     message("title",""+gp.id)  ;
     setTimeout(function() {message("title","")},800);
     document.body.style.backgroundColor="#333";
     gpok=true;
 }
 if (! gpok) return;
 
 // il faut relire la liste de gamepad: elle est dynamique (sous chrome)...
 gp=((navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.getGamepads())[0];
 
 var vb=[0,0,0,0,0,0]
 for (var ib=0;ib<6;ib++) vb[ib]=gp.buttons[ib].pressed ? 1 : 0 ;
 
 var x=(1+gp.axes[0])*100;
 var y=(1+gp.axes[1])*100;
 var z=(1+gp.axes[2])*100;
 position("cross",x*100-5,y*100-5);
 if (x>90 && x<110) x=100;
 if (y>90 && y<110) y=100;
 if (z>80 && z<120) z=100;
 if (! mouseXY && ! mouseZ)
   transmit([Math.round(x),Math.round(y),Math.round(z),vb,-100,0]);
}

function togleDebug(b) {
 var n=document.getElementById('debug').style; 
 n.visibility= (n.visibility=='hidden') ? 'visible' : 'hidden';
 for (id in 'b1 a1 a2 a3 ws ws2 stitle'.split(' ')) message(id,'');
 b.value=(n.visibility=='hidden') ? 'set debug' : 'reset debug';
}

var idi=null;
function init() {
 initWebSocket(1901);
 idi=setInterval(function() { mloop();},80);
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

