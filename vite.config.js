import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Tüm JS ve CSS tek bir index.html içine gömülür (viteSingleFile) ve çıktı `docs/`
// klasörüne yazılır. GitHub Pages doğrudan `docs/` klasöründen yayınlanacak şekilde
// ayarlanır (Deploy from branch → main → /docs). Böylece:
//  - Sunucu tarafında derleme (Actions) YOK → yarışan iki sistem sorunu biter.
//  - Yüklenecek harici dosya YOK (her şey tek dosyada) → önbellek kaynaklı boş ekran biter.
// Yerel geliştirme (npm run dev) hâlâ kök dizindeki index.html'i kullanır.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
