/* eslint-disable */
// @ts-nocheck
import * as grpcWeb from 'grpc-web';
import hello_pb_module from './hello_pb.js';

const grpc = { web: grpcWeb };

// IMPORTANT: Create a fresh local object to avoid the "not extensible" error
const proto = {
  hello: {
    ...hello_pb_module
  }
};

proto.hello.HelloServiceClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';
  this.client_ = new grpc.web.GrpcWebClientBase(options);
  this.hostname_ = hostname.replace(/\/+$/, '');
};

proto.hello.HelloServicePromiseClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';
  this.client_ = new grpc.web.GrpcWebClientBase(options);
  this.hostname_ = hostname.replace(/\/+$/, '');
};

const methodDescriptor_HelloService_SayHello = new grpc.web.MethodDescriptor(
  '/hello.HelloService/SayHello',
  grpc.web.MethodType.UNARY,
  proto.hello.HelloRequest,
  proto.hello.HelloReply,
  function(request) { return request.serializeBinary(); },
  proto.hello.HelloReply.deserializeBinary
);

proto.hello.HelloServiceClient.prototype.sayHello = function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ + '/hello.HelloService/SayHello',
    request, metadata || {}, methodDescriptor_HelloService_SayHello, callback);
};

proto.hello.HelloServicePromiseClient.prototype.sayHello = function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ + '/hello.HelloService/SayHello',
    request, metadata || {}, methodDescriptor_HelloService_SayHello);
};

export const HelloServiceClient = proto.hello.HelloServiceClient;
export const HelloServicePromiseClient = proto.hello.HelloServicePromiseClient;
export default proto.hello;