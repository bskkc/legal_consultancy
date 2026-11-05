# Frontend - Legal Consultancy

React ve Material-UI ile geliştirilmiş modern web arayüzü.

## Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- Backend API çalışıyor olmalı (http://localhost:5000)

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **.env dosyasını oluşturun (opsiyonel):**
```
VITE_API_URL=http://localhost:5000/api
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde açılacaktır.

## Proje Yapısı

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Üst menü ve logo
│   │   ├── Footer.jsx          # Alt bilgiler
│   │   └── WhatsAppButton.jsx  # WhatsApp yüzen buton
│   ├── pages/
│   │   ├── Home.jsx            # Anasayfa
│   │   ├── Articles.jsx        # Makale kategorileri
│   │   ├── ArticlesByCategory.jsx  # Kategori içindeki makaleler
│   │   ├── ArticleDetail.jsx   # Makale detayı
│   │   ├── Team.jsx            # Ekip listesi
│   │   ├── TeamDetail.jsx      # Ekip üyesi detayı
│   │   └── Contact.jsx         # İletişim sayfası
│   ├── services/
│   │   └── api.js              # API istekleri
│   ├── App.jsx                 # Ana uygulama
│   └── main.jsx                # Giriş noktası
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Sayfalar

### Anasayfa (`/`)
- Hero bölümü
- Kurumsal bilgiler
- En fazla 5 adet hizmet kategorisi

### Makaleler (`/makaleler`)
- Tüm kategorileri card formatında gösterir
- Tıklanabilir kategoriler

### Kategori Makaleleri (`/makaleler/:slug`)
- Seçili kategoriye ait tüm makaleleri listeler
- Her makale için görsel, başlık ve özet

### Makale Detayı (`/makale/:slug`)
- Makalenin tam içeriği
- Başlık, görsel ve yayın tarihi

### Ekibimiz (`/ekibimiz`)
- Ekip üyelerini fotoğraf ve isim ile gösterir
- Tıklanabilir kartlar

### Ekip Üyesi Detayı (`/ekibimiz/:id`)
- Fotoğraf, unvan, detaylı biyografi
- Sosyal medya linkleri (LinkedIn, Twitter, Email)

### İletişim (`/iletisim`)
- İletişim bilgileri (Telefon, Email, Adres)
- Google Haritalar entegrasyonu alanı
- İletişim formu (reCAPTCHA ile korunan)

## Global Bileşenler

### Header
- Logo/İşletme adı
- Ana menü linkleri (Anasayfa, Makaleler, Ekibimiz, İletişim)

### Footer
- Kurumsal bilgiler
- İletişim detayları
- Telif hakkı bilgisi

### WhatsApp Butonu
- Tüm sayfalarda sabit konum (sağ alt)
- Tıklandığında WhatsApp sohbeti açılır

## Teknolojiler

- **React 18** - UI kütüphanesi
- **React Router DOM** - Sayfa yönlendirmesi
- **Material-UI (MUI)** - UI bileşenleri
- **Axios** - HTTP istemci
- **React Google reCAPTCHA** - Form koruması
- **Vite** - Geliştirme sunucusu ve derleyici

## Önemli Notlar

- WhatsApp numarasını `src/components/WhatsAppButton.jsx` dosyasında değiştirin
- reCAPTCHA anahtarını `.env` dosyasında yapılandırın
- Backend API'sinin çalışır durumda olması gerekir
- Telefon numarası formatı: `90` ile başlamalı (Türkiye kodu için)

## Build

Üretim için derleme:
```bash
npm run build
```

Preview:
```bash
npm run preview
```
