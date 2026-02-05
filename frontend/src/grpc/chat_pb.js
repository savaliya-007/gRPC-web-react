/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf';

var goog = jspb;
var proto = { chat: {} };

// Constructor for UserIdentity
proto.chat.UserIdentity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.chat.UserIdentity, jspb.Message);

proto.chat.UserIdentity.prototype.getUserId = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};

proto.chat.UserIdentity.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

// Serialization logic that was missing/disconnected
proto.chat.UserIdentity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  if (this.getUserId().length > 0) {
    writer.writeString(1, this.getUserId());
  }
  return writer.getResultBuffer();
};

// Constructor for DirectMessage
proto.chat.DirectMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.chat.DirectMessage, jspb.Message);

proto.chat.DirectMessage.prototype.getFrom = function() { return jspb.Message.getFieldWithDefault(this, 1, ""); };
proto.chat.DirectMessage.prototype.setFrom = function(v) { return jspb.Message.setProto3StringField(this, 1, v); };
proto.chat.DirectMessage.prototype.getTo = function() { return jspb.Message.getFieldWithDefault(this, 2, ""); };
proto.chat.DirectMessage.prototype.setTo = function(v) { return jspb.Message.setProto3StringField(this, 2, v); };
proto.chat.DirectMessage.prototype.getMessage = function() { return jspb.Message.getFieldWithDefault(this, 3, ""); };
proto.chat.DirectMessage.prototype.setMessage = function(v) { return jspb.Message.setProto3StringField(this, 3, v); };

proto.chat.DirectMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  if (this.getFrom()) writer.writeString(1, this.getFrom());
  if (this.getTo()) writer.writeString(2, this.getTo());
  if (this.getMessage()) writer.writeString(3, this.getMessage());
  return writer.getResultBuffer();
};

// Empty response placeholder
proto.chat.Empty = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.chat.Empty, jspb.Message);
proto.chat.Empty.prototype.serializeBinary = function() { return new Uint8Array(); };
proto.chat.Empty.deserializeBinary = function(bin) { return new proto.chat.Empty(); };

// Static deserializers (Required by the Client)
proto.chat.DirectMessage.deserializeBinary = function(bin) {
  var reader = new jspb.BinaryReader(bin);
  var msg = new proto.chat.DirectMessage();
  while (reader.nextField()) {
    if (reader.isEndGroup()) break;
    switch (reader.getFieldNumber()) {
      case 1: msg.setFrom(reader.readString()); break;
      case 2: msg.setTo(reader.readString()); break;
      case 3: msg.setMessage(reader.readString()); break;
      default: reader.skipField(); break;
    }
  }
  return msg;
};

export const UserIdentity = proto.chat.UserIdentity;
export const DirectMessage = proto.chat.DirectMessage;
export const Empty = proto.chat.Empty;
export default proto.chat;