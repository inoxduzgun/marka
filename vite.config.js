import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — GitHub Pages'te repo adı ne olursa olsun çalışması için göreli yollar
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Dosya adlarını SABİT tut (içerik hash'i yok). Neden:
    // Her güncellemede hash'li dosya adı değişince eski dosya siliniyor; tarayıcı eski
    // (önbellekteki) index.html ile silinmiş dosyayı isteyip boş/siyah ekran veriyordu.
    // Sabit adlarla önbellekteki sayfa her zaman var olan bir dosyayı işaret eder.
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
