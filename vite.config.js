import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "https://people.googleapis.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
  plugins: [vue()],
})
