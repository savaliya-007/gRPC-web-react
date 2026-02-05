// src/main.jsx
if (typeof window !== 'undefined') {
  window.require = (name) => {
    if (name === 'google-protobuf') return import('google-protobuf');
    if (name === 'grpc-web') return import('grpc-web');
    throw new Error(`Module ${name} not found in shim`);
  };
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
