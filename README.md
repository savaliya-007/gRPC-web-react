# 💬 gRPC-Web Chat Application

A high-performance, real-time chat application built using **Node.js**, **gRPC-Web**, and **Envoy Proxy**. This setup allows a browser-based frontend to communicate with a gRPC backend by using Envoy as a translation layer.

---

## 🏗 System Architecture

Because browsers cannot handle standard gRPC (HTTP/2 trailers), the application uses the following workflow:

1. **Frontend** – React/Vite app sends `gRPC-Web` requests.
2. **Envoy Proxy** – Translates `HTTP/1.1` gRPC-Web into pure `gRPC`.
3. **Backend** – Node.js gRPC server processes the chat logic.

---

## 🚀 Execution Guide

To run the project, open **three separate terminals** and execute the following commands.

### 1. Backend Service
Starts the core gRPC server.

```bash

# Terminal 1
    cd backend
    npm install
    node server.js

# Terminal 2
    docker run -it --rm --name envoy \
    -p 8080:8080 \
    -v ${PWD}/envoy.yaml:/etc/envoy/envoy.yaml \
    envoyproxy/envoy:v1.22.0

# Terminal 3
    cd frontend
    npm install
    npm run dev

```

### 🛠 Project Configuration

  |-----------------------------------|
  | Component   Technology      Port  |
  | ----------------------------------| 
  | Frontend	React / Vite    3000  |
  | Proxy	    Envoy Proxy	    8080  | 
  | Backend	    Node.js [gRPC]	50051 |
  |-----------------------------------|
  

----------


### 📋 Troubleshooting & Notes

Postman Testing – To test the backend directly, use a gRPC Request in Postman and point it to localhost:50051.

CORS – If the browser blocks requests, ensure your envoy.yaml allows the origin http://localhost:3000.

Protos – All service definitions are located in the /proto folder.

Docker Pathing – If using Linux, Mac, or Git Bash, replace ${PWD} with $(pwd).
