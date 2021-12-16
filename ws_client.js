// 2021-12-16 @PioneerRedwood

const {WebSocket} = require('ws');

const ws = new WebSocket('ws://localhost:8081');

function heartbeat(ws, message){
    setInterval(()=>{
        ws.send(message);
    }, 1000);
};

ws.on('open', function onOpen(){
    ws.send("hello server?");
    heartbeat(this, "hello ?");
    
});

ws.on('close', function onClose(event){
    clearInterval(heartbeat);

    console.log('closed');
});

ws.on('message', function onMessage(data){
    console.log(data);
});

ws.on('close', function onClose(){
    ws.close();
});