/* eslint-disable */
// @ts-nocheck
import * as grpcWeb from 'grpc-web';
import * as chat_pb_module from './chat_pb.js';

const grpc = { web: grpcWeb };
const proto = {
  chat: { ...chat_pb_module.default }
};

proto.chat.ChatServiceClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';
  this.client_ = new grpc.web.GrpcWebClientBase(options);
  this.hostname_ = hostname.replace(/\/+$/, '');
};

const methodDescriptor_ChatService_SendMessage = new grpc.web.MethodDescriptor(
  '/chat.ChatService/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.chat.DirectMessage,
  proto.chat.Empty,
  function(request) { return request.serializeBinary(); },
  proto.chat.Empty.deserializeBinary
);

const methodDescriptor_ChatService_Subscribe = new grpc.web.MethodDescriptor(
  '/chat.ChatService/Subscribe',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.chat.UserIdentity,
  proto.chat.DirectMessage,
  function(request) { return request.serializeBinary(); },
  proto.chat.DirectMessage.deserializeBinary
);

proto.chat.ChatServiceClient.prototype.sendMessage = function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ + '/chat.ChatService/SendMessage',
    request, metadata || {}, methodDescriptor_ChatService_SendMessage, callback);
};

proto.chat.ChatServiceClient.prototype.subscribe = function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ + '/chat.ChatService/Subscribe',
    request, metadata || {}, methodDescriptor_ChatService_Subscribe);
};

export const ChatServiceClient = proto.chat.ChatServiceClient;
export default proto.chat;