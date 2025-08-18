import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- THÊM VÀO ĐOẠN CODE NÀY ---
  server: {
    proxy: {
      // Khi frontend gọi API có tiền tố '/api'
      '/api': {
        // Vite sẽ chuyển tiếp yêu cầu đó đến backend server của bạn
        target: 'http://localhost:3001',
        
        // Cần thiết để backend nhận yêu cầu một cách chính xác
        changeOrigin: true,
      }
    }
  }
})