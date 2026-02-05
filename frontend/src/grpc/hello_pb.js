/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf';

var goog = jspb;
var proto = { hello: {} }; 

var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.hello.HelloReply', null, global);
goog.exportSymbol('proto.hello.HelloRequest', null, global);

proto.hello.HelloRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.hello.HelloRequest, jspb.Message);

proto.hello.HelloReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.hello.HelloReply, jspb.Message);

if (jspb.Message.GENERATE_TO_OBJECT) {
  proto.hello.HelloRequest.prototype.toObject = function(opt_includeInstance) {
    return proto.hello.HelloRequest.toObject(opt_includeInstance, this);
  };
  proto.hello.HelloRequest.toObject = function(includeInstance, msg) {
    var f, obj = { name: jspb.Message.getFieldWithDefault(msg, 1, "") };
    if (includeInstance) { obj.$jspbMessageInstance = msg; }
    return obj;
  };
}

proto.hello.HelloRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.hello.HelloRequest;
  return proto.hello.HelloRequest.deserializeBinaryFromReader(msg, reader);
};

proto.hello.HelloRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) break;
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = (reader.readString());
        msg.setName(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

proto.hello.HelloRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.hello.HelloRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

proto.hello.HelloRequest.serializeBinaryToWriter = function(message, writer) {
  var f = message.getName();
  if (f.length > 0) { writer.writeString(1, f); }
};

proto.hello.HelloRequest.prototype.getName = function() {
  return (jspb.Message.getFieldWithDefault(this, 1, ""));
};

proto.hello.HelloRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  proto.hello.HelloReply.prototype.toObject = function(opt_includeInstance) {
    return proto.hello.HelloReply.toObject(opt_includeInstance, this);
  };
  proto.hello.HelloReply.toObject = function(includeInstance, msg) {
    var f, obj = { message: jspb.Message.getFieldWithDefault(msg, 1, "") };
    if (includeInstance) { obj.$jspbMessageInstance = msg; }
    return obj;
  };
}

proto.hello.HelloReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.hello.HelloReply;
  return proto.hello.HelloReply.deserializeBinaryFromReader(msg, reader);
};

proto.hello.HelloReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) break;
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = (reader.readString());
        msg.setMessage(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

proto.hello.HelloReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.hello.HelloReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

proto.hello.HelloReply.serializeBinaryToWriter = function(message, writer) {
  var f = message.getMessage();
  if (f.length > 0) { writer.writeString(1, f); }
};

proto.hello.HelloReply.prototype.getMessage = function() {
  return (jspb.Message.getFieldWithDefault(this, 1, ""));
};

proto.hello.HelloReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

export const HelloRequest = proto.hello.HelloRequest;
export const HelloReply = proto.hello.HelloReply;
export default proto.hello;