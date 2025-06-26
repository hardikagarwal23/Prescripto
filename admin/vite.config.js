import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remove @tailwindcss/vite, no need for this plugin in the Vite config
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 }
})
