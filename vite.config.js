import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Tüm JS ve CSS tek bir index.html içine gömülür (viteSingleFile).
// Neden: Ayrı dosyalar yüklenince, tarayıcının önbelleklediği eski index.html
// artık silinmiş bir dosyayı isteyip boş/siyah ekran verebiliyordu. Tek dosyada
// yüklenecek başka hiçbir kaynak olmadığı için bu sorun tamamen ortadan kalkar.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
