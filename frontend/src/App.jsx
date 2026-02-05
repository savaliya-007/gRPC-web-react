import React, { useState } from 'react';
import { HelloRequest } from './grpc/hello_pb';
import { HelloServiceClient } from './grpc/hello_grpc_web_pb';

const client = new HelloServiceClient('http://localhost:8080', null, null);

export default function App() {
  const [name, setName] = useState('');
  const [reply, setReply] = useState('');

  const sayHello = () => {
    const req = new HelloRequest();
    req.setName(name);

    client.sayHello(req, {}, (err, res) => {
      if (err) {
        console.error(err);
        setReply('Error: ' + err.message);
        return;
      }
      setReply(res.getMessage());
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>gRPC-Web Hello World</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <button onClick={sayHello}>Send</button>
      <p>Response: {reply}</p>
    </div>
  );
}