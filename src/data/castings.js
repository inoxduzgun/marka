// Kurgusal örnek casting çağrıları
const castings = [
  {
    id: 1,
    title: { tr: 'Gazlı İçecek Reklamı — Yaz Kampanyası', en: 'Soft Drink Commercial — Summer Campaign' },
    brand: 'FreshCo (demo)',
    type: 'ad',
    desc: {
      tr: '20-30 yaş arası, enerjik, sportif görünümlü 2 kadın 2 erkek oyuncu aranıyor. Plaj çekimi, yüzme bilmek şart.',
      en: 'Looking for 2 female and 2 male actors, ages 20-30, energetic and athletic. Beach shoot, swimming required.',
    },
    fee: '15.000₺ / gün',
    deadline: '2026-08-15',
    open: true,
  },
  {
    id: 2,
    title: { tr: 'Dijital Banka Uygulaması — Ana Karakter', en: 'Digital Banking App — Lead Character' },
    brand: 'NeoBank (demo)',
    type: 'ad',
    desc: {
      tr: '28-40 yaş arası, güven veren, profesyonel görünümlü 1 oyuncu. Diksiyon güçlü olmalı, İngilizce artı.',
      en: 'One actor, ages 28-40, trustworthy and professional look. Strong diction required, English is a plus.',
    },
    fee: '25.000₺ / proje',
    deadline: '2026-08-05',
    open: true,
  },
  {
    id: 3,
    title: { tr: 'Dönem Dizisi — Yardımcı Roller', en: 'Period Drama — Supporting Roles' },
    brand: 'Yapım Evi (demo)',
    type: 'series',
    desc: {
      tr: '40-60 yaş arası, tiyatro deneyimli 3 kadın 3 erkek oyuncu. Uzun soluklu proje, İstanbul çekim.',
      en: '3 female, 3 male actors, ages 40-60, with theatre background. Long-term project, shot in Istanbul.',
    },
    fee: 'Bölüm başı anlaşma',
    deadline: '2026-09-01',
    open: true,
  },
  {
    id: 4,
    title: { tr: 'Pop Şarkısı Klibi — Dansçılar', en: 'Pop Music Video — Dancers' },
    brand: 'Plak Şirketi (demo)',
    type: 'clip',
    desc: {
      tr: '18-28 yaş arası, dans deneyimi olan 6 oyuncu/dansçı. 2 günlük çekim, stüdyo ortamı.',
      en: '6 actors/dancers, ages 18-28, with dance experience. 2-day studio shoot.',
    },
    fee: '8.000₺ / gün',
    deadline: '2026-07-30',
    open: true,
  },
  {
    id: 5,
    title: { tr: 'Kargo Firması — Sosyal Medya Serisi', en: 'Courier Company — Social Media Series' },
    brand: 'HızlıKargo (demo)',
    type: 'social',
    desc: {
      tr: 'Her yaştan, doğal ve samimi görünümlü oyuncular. Aylık düzenli çekim, uzun dönem iş birliği.',
      en: 'Natural, genuine-looking actors of all ages. Regular monthly shoots, long-term collaboration.',
    },
    fee: '5.000₺ / çekim',
    deadline: '2026-08-20',
    open: true,
  },
  {
    id: 6,
    title: { tr: 'Sinema Filmi — Figürasyon', en: 'Feature Film — Background Roles' },
    brand: 'Film Prodüksiyon (demo)',
    type: 'film',
    desc: {
      tr: 'Kalabalık sahneler için her yaştan 50+ figüran. Deneyim şartı yok, yeni yüzler öncelikli.',
      en: '50+ extras of all ages for crowd scenes. No experience required, fresh faces prioritized.',
    },
    fee: '2.500₺ / gün',
    deadline: '2026-07-28',
    open: false,
  },
]

export default castings
