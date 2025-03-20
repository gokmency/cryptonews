# Crypto Vibe Aggregator

## Proje Genel Bakış

Crypto Vibe Aggregator, kripto para dünyasındaki haberleri ve duygu durumunu (market sentiment) takip etmek isteyen kullanıcılar için geliştirilmiş bir web uygulamasıdır. Uygulama, çeşitli haber kaynaklarından kripto para haberleri toplar, bunları analiz eder ve kullanıcıların kolayca takip edebilmesi için görselleştirir.

## Güncel Durum

Uygulama şu anda aktif geliştirilme aşamasındadır. Temel işlevsellik tamamlandı ve ilk sürüm kullanıma hazır. Kullanıcılar haberleri görüntüleyebilir, filtreleyebilir, oylayabilir ve yer imlerine ekleyebilirler. Çoklu API stratejisi sayesinde daha güvenilir ve kesintisiz bir haber akışı sağlanmaktadır. Göz yorgunluğunu azaltan pastel krem rengi tema, kullanıcıların uzun süre uygulamayı rahatlıkla kullanabilmelerini sağlar.

## Tamamlanan Özellikler

- ✅ Temel uygulama yapısı ve modern UI/UX tasarımı
- ✅ Çoklu API entegrasyonu stratejisi (CryptoCompare, CryptoPanic, LunarCrush)
- ✅ Gelişmiş haber kartları (resimler, duygu durumu göstergeleri, zaman bilgisi)
- ✅ Kapsamlı haber filtreleme ve arama
- ✅ Duygu durumu analizi (sentiment analysis) ve renk kodlaması
- ✅ Dil desteği (Türkçe/İngilizce)
- ✅ Kripto para fiyat widget'ı
- ✅ Responsive tasarım (tüm cihazlarla uyumlu)
- ✅ Hata yakalama ve kullanıcı bildirimleri sistemi
- ✅ Yedekleme API stratejisi (API'ler kullanılamadığında alternatif kaynaklar)
- ✅ Haber oylama sistemi (olumlu/olumsuz)
- ✅ Haberleri yer imlerine ekleme
- ✅ localStorage ile kullanıcı tercihlerini saklama
- ✅ Toast bildirimleri ile kullanıcı geri bildirimleri
- ✅ Performans optimizasyonları (gereksiz render önleme, kod bölme)
- ✅ Erişilebilirlik iyileştirmeleri (tooltip, klavye navigasyonu)
- ✅ Göz yorgunluğunu azaltan pastel krem tema
- ✅ Duygu durumu etiketleri (pozitif/negatif/nötr haberler)
- ✅ Yumuşak köşeli ve gölgeli kartlar
- ✅ Gelişmiş mikro-etkileşimler ve geçiş efektleri

## API Anahtarları

Aşağıdaki API anahtarları `.env` dosyasında saklanmalıdır. Örnek format için `.env.example` dosyasına bakın.

- CryptoPanic API: `VITE_CRYPTOPANIC_API_KEY`
- CryptoCompare API: `VITE_CRYPTOCOMPARE_API_KEY`
- LunarCrush API: `VITE_LUNARCRUSH_API_KEY`

## Gelecek Geliştirmeler: Arayüz ve UX İyileştirmeleri

- ⬜ Karanlık mod / Açık mod geçişi ve tema desteği
- ⬜ Animasyon ve geçiş efektleri ile daha dinamik kullanıcı arayüzü
- ⬜ Sürükle-bırak ile özelleştirilebilir dashboard
- ⬜ İnteraktif kripto para grafikleri ve fiyat göstergeleri
- ⬜ Görsel bildirim sistemi (web push notifications)
- ⬜ Infinity scroll ile daha akıcı haber yükleme
- ⬜ İleri seviye filtreleme UI/UX (filtre çubuğu geliştirmeleri)
- ⬜ Haber detay sayfası ve zengin içerik görüntüleme
- ⬜ Haber kaynağı önizlemeleri (URL preview cards)
- ⬜ İlgili haberleri gruplama ve ilişkili içerik gösterimi
- ⬜ Sosyal medya paylaşım butonları ve entegrasyonu
- ⬜ Mikroetkileşimler ile daha çekici kullanıcı deneyimi
- ⬜ Gelişmiş haber kategorileri ve görsel etiketleme sistemi
- ⬜ Resim optimizasyonu ve lazy loading geliştirmeleri
- ⬜ Daha fazla renk paleti ve kişiselleştirilebilir tema seçenekleri
- ⬜ Otomatik tema değişimi (gündüz/gece modları)
- ⬜ Font boyutu ayarlamaları ve tipografi geliştirmeleri

## Gelecek Geliştirmeler: Uygulama Özellikleri

- ⬜ Kullanıcı kaydı ve oturum yönetimi
- ⬜ Kişiselleştirilmiş haber akışı ve öneri sistemi
- ⬜ Gerçek zamanlı kripto para fiyatları ve grafikler
- ⬜ Kullanıcı profili ve tercihler sayfası
- ⬜ Bildirim sistemi ve abonelikler
- ⬜ Portföy takibi ve varlık yönetimi
- ⬜ Gelişmiş arama filtreleri (tarih aralığı, kaynak)
- ⬜ Haber ve duygu durumu analitiği
- ⬜ PWA (Progressive Web App) desteği
- ⬜ Yorum sistemi ve topluluk etkileşimi
- ⬜ Kullanıcı aktivite geçmişi
- ⬜ Premium içerik ve abonelik seçenekleri
- ⬜ Daha fazla dil desteği
- ⬜ API kullanım istatistikleri dashboard'u

## Teknik Geliştirilecek Alanlar

- ⬜ Server-side rendering (SSR) veya static site generation (SSG) desteği
- ⬜ Bundle size optimizasyonu ve code splitting
- ⬜ Test kapsamını artırma (birim testler, e2e testleri)
- ⬜ Sunucu taraflı API proxy ile güvenliği artırma
- ⬜ WebSocket entegrasyonu ile gerçek zamanlı güncellemeler
- ⬜ Service worker ile offline modu desteği
- ⬜ React Suspense ve Concurrent Mode desteği
- ⬜ Performans metriklerini izleme ve analiz
- ⬜ SEO optimizasyonları
- ⬜ GraphQL API entegrasyonu (mümkünse)
- ⬜ Edge caching stratejileri
- ⬜ Daha kapsamlı hata izleme ve raporlama

## Teknik Detaylar

### Teknoloji Stack

- React + Vite
- TypeScript
- TailwindCSS
- Shadcn/UI
- Tanstack React Query (Veri yönetimi)
- Zustand (State yönetimi)
- SWR (Veri alma ve önbelleğe alma)

### API Yedekleme Stratejisi

Uygulama, haber verilerini almak için şu API'leri şu sırayla kullanır:

1. CryptoCompare API
2. CryptoPanic API
3. LunarCrush API
4. Önceden tanımlanmış örnek haberler

Her API başarısız olduğunda, bir sonraki API otomatik olarak denenecektir. Tüm API'ler başarısız olursa, kullanıcıya bir hata mesajı gösterilir ve örnek haberler gösterilir.

### Proje Yapısı

```
crypto-vibe-aggregator/
├── src/
│   ├── components/      # UI bileşenleri
│   │   ├── ui/          # Temel UI bileşenleri (shadcn)
│   │   ├── News/        # Haber ile ilgili bileşenler
│   ├── contexts/        # Uygulama bağlamları
│   ├── hooks/           # Özel React hook'ları
│   ├── lib/             # Yardımcı fonksiyonlar ve sabitler
│   ├── pages/           # Sayfa bileşenleri
│   ├── styles/          # Global stil dosyaları
│   └── App.tsx          # Ana uygulama bileşeni
├── public/              # Statik dosyalar
├── .env                 # Ortam değişkenleri
├── .env.example         # Örnek ortam değişkenleri
└── vite.config.ts       # Vite yapılandırması
```

## Kurulum ve Çalıştırma

1. Projeyi klonlayın
2. Gerekli paketleri yükleyin: `npm install`
3. `.env.example` dosyasını `.env` olarak kopyalayın ve API anahtarlarını ekleyin
4. Geliştirme sunucusunu başlatın: `npm run dev`
5. Tarayıcınızda `http://localhost:5173` adresine gidin

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir pull request oluşturun. Büyük değişiklikler için önce bir issue açıp tartışmayı tercih ederiz.

## Lisans

MIT 