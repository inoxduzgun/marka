# SETCAST — Casting Platformu Demo

Reklam, film, dizi ve klipler için casting/audition platformu **konsept demosu**.
Türkçe + İngilizce, tamamen tarayıcıda çalışır (backend yok — tüm veriler örnektir,
kayıtlar yalnızca tarayıcının localStorage'ında tutulur).

## Özellikler

- 🏠 Tanıtım (landing) sayfası — değer önerisi, nasıl çalışır, iş modeli
- 👤 E-posta + şifre ile kayıt/giriş (demo)
- 📋 KVKK onaylı, adım adım profil oluşturma sihirbazı
  (isim, telefon, sosyal medya, şehir, yaş, boy, kilo, beden ölçüleri, fotoğraf, video audition)
- 🎭 Oyuncu havuzu — filtreleme (yaş, cinsiyet, şehir, saç/göz rengi, deneyim) + favoriler
- 📢 Casting çağrıları + başvuru akışı
- 🏷️ Markalar için brief gönderme formu
- 🛠️ Yönetici paneli — talepler, casting yönetimi, başvurular, kayıtlı kullanıcılar

## Yerelde Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## GitHub Pages'te Yayınlama

1. GitHub'da yeni bir repo oluştur (örn. `setcast-demo`).
2. Bu klasörü push et:
   ```bash
   git init
   git add .
   git commit -m "SETCAST demo"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADIN/setcast-demo.git
   git push -u origin main
   ```
3. Repo'da **Settings → Pages → Source: GitHub Actions** seç.
4. Push'tan 1-2 dakika sonra site `https://KULLANICI_ADIN.github.io/setcast-demo/` adresinde yayında olur.

## Önemli Notlar

- ⚠️ **KVKK metni bir şablondur** — gerçek yayına geçmeden önce mutlaka bir hukuk danışmanına kontrol ettirin.
- Bu bir demodur: şifreler tarayıcıda düz metin saklanır, dosyalar sunucuya yüklenmez.
  Gerçek üründe backend (kimlik doğrulama, video depolama, veritabanı) eklenecektir.
- Tüm oyuncu profilleri kurgusaldır; gerçek kişiler değildir.
