import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: [
      { find: /^@irl-browser\/onboarding\/react$/, replacement: path.resolve(__dirname, '../dist/react.js') },
      { find: /^@irl-browser\/onboarding$/, replacement: path.resolve(__dirname, '../dist/index.js') },
    ],
  },
})
