// 2021-12-16 @PioneerRedwood
// required

// import WebSocket, { WebSocketServer } from "ws";
const { WebSocketServer } = require("ws");

// etc functions
function heartbeat() {
  this.isAlive = true;
}

const ws_server = new WebSocketServer(
  {
    // backlog: 3,
    // clientTracking: true,
    // handleProtocols:
    host: "ws_server",
    // maxPayload: 2048,
    // noServer: false,
    // path: "/"
    // perMessageDeflate: false,
    port: 45000,
    // server:
    // skipUTF8Validation: false,
    // verifyClient:
  }
  // , callback
);

const client_checker = setInterval(function ping() {
  ws_server.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

// on(event: "connection", cb: (this: Server, socket: WebSocket, request: IncomingMessage) => void): this;
// on(event: "error", cb: (this: Server, error: Error) => void): this;
// on(event: "headers", cb: (this: Server, headers: string[], request: IncomingMessage) => void): this;
// on(event: "close" | "listening", cb: (this: Server) => void): this;
// on(event: string | symbol, listener: (this: Server, ...args: any[]) => void): this;

// on connection
ws_server.on("connection", function connection(ws, req) {
  ws.isAlive = true;
  ws.on("pong", heartbeat);
  console.log(req.socket.remoteAddress + " is connected");
  //   ws.on("message", (data) => {
  //     console.log("received: %s", data);
  //   });

  ws.send("hello ?");
});

// on error
ws_server.on("error", function error(ws, error) {
  // ws.terminate();
  console.log("ERROR:" + error);
});

// on headers
ws_server.on("headers", function headers(ws) {
  console.log("headers");
});

// on close
ws_server.on("close", function close(ws) {
  console.log("close");
  clearInterval(client_checker);
});

// on greeting message
// TODO: response

// -- NOT WORKING --