// 2021-12-16 @PioneerRedwood

const {WebSocket} = require('ws');
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({port: 8081});

wss.on('connection', function onConnection(ws){
    // ws.on('message', function onMessage(data, isBinary){
    //     wss.clients.forEach(function each(client) {
    //         if(client.readyState === WebSocket.OPEN) {
    //             // client.send(data, {binary: isBinary});
    //             client.send("hello client");
    //         }
    //     });
    // });

    ws.send('you\'re connected');
});

wss.on('listening', function onListening(ws){
    console.log('listening');
});

wss.on('close', function onClose(ws){
    console.log('disconnected');
})

wss.on('message', function onMessage(data){
    console.log(data);
});
