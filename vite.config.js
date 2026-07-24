import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — GitHub Pages'te repo adı ne olursa olsun çalışması için göreli yollar
export default defineConfig({
  plugins: [react()],
  base: './',
})
