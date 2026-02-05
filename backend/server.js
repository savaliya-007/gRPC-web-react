const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "proto/chat.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

const activeUsers = new Map();

function sendMessage(call, callback) {
  const { from, to, message } = call.request;
  console.log(`${from} -> ${to}: ${message}`);

  const targetStream = activeUsers.get(to);

  if (targetStream) {
    targetStream.write({
      from: from,
      to: to,
      message: message,
      timestamp: Date.now()
    });
  } else {
    console.log(`[WARN] User ${to} is not online.`);
  }
  
  callback(null, {});
}

function subscribe(call) {
  const userId = call.request.userId;

  activeUsers.set(userId, call);
  console.log(` ${userId} is now online.`);

  call.on("cancelled", () => {
    activeUsers.delete(userId);
    console.log(`${userId} went offline.`);
  });
}

const server = new grpc.Server();
server.addService(chatProto.ChatService.service, { sendMessage, subscribe });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("Chat Server running on port 50051");
});