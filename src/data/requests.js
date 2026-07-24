// Yönetici panelinde gösterilen kurgusal örnek marka talepleri
const demoRequests = [
  {
    id: 'demo-1',
    kind: 'brief',
    brand: 'FreshCo (demo)',
    contactName: 'Ali Vural',
    email: 'ali@freshco-demo.com',
    projectType: 'ad',
    desc: { tr: 'Yaz kampanyası için 4 sportif oyuncu arıyoruz.', en: 'Looking for 4 athletic actors for our summer campaign.' },
    date: '2026-07-20',
  },
  {
    id: 'demo-2',
    kind: 'actorRequest',
    brand: 'NeoBank (demo)',
    actorName: 'Mert Kaya',
    actorId: 2,
    date: '2026-07-22',
  },
  {
    id: 'demo-3',
    kind: 'brief',
    brand: 'Plak Şirketi (demo)',
    contactName: 'Seda Nur',
    email: 'seda@plak-demo.com',
    projectType: 'clip',
    desc: { tr: 'Yeni klip için 6 dansçı oyuncu talep ediyoruz.', en: 'Requesting 6 dancer-actors for a new music video.' },
    date: '2026-07-23',
  },
]

export default demoRequests
