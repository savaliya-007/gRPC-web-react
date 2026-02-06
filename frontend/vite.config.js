import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000
  },
 define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['google-protobuf', 'grpc-web'],
  }
})
