# Web Frontend Spesifikasyonları (React & MUI)

Bu doküman, ziyaretçiye açık olan web sitesinin kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) gereksinimlerini ve sayfa yapısını içerir.

## 1. Global Bileşenler

* **Header:** Logo, Ana Menü Linkleri (Anasayfa, Makaleler, Ekibimiz, İletişim).
* **Footer:** Kurumsal bilgiler, İletişim detayları, Telif Hakkı.
* **WhatsApp Butonu:** Tüm sayfalarda sabit/yüzen (floating) bir ikon/buton olarak yer almalı ve direkt WhatsApp üzerinden iletişimi başlatmalıdır.

## 2. Sayfa Spesifikasyonları

### 2.1. Anasayfa (`/`)

* **Hero Bölümü:** Büyük, dikkat çekici görsel veya video ile slogan.
* **Hakkımızda Bölümü:** Firmayı tanıtan kısa metin.
* **Makale Kategorileri:** **En fazla 5 adet** kategori (dinamik olarak Backend'den çekilir) card formatında gösterilir. Tıklanabilir olmalıdır.

### 2.2. Makaleler Sayfaları

| Rota | İçerik Gösterimi | API Verisi |
| :--- | :--- | :--- |
| `/makaleler` | Tüm 10 kategori, cardlar halinde listelenir. | `GET /api/categories` |
| `/makaleler/:slug` | İlgili kategoriye ait makaleler listelenir. Her makale için: Görsel, Başlık ve Özet içeren bir card kullanılır. | `GET /api/articles/category/:slug` |
| `/makale/:slug` | Tek bir makalenin tam içeriği, başlığı, görseli ve varsa yazar bilgisi. | `GET /api/articles/:slug` |

### 2.3. Ekibimiz Sayfaları

| Rota | İçerik Gösterimi | API Verisi |
| :--- | :--- | :--- |
| `/ekibimiz` | Her bir ekip üyesi için fotoğraf ve isim içeren cardlar listelenir. | `GET /api/team` |
| `/ekibimiz/:id` | Seçilen ekip üyesinin fotoğrafı, unvanı, detaylı biyografisi. | `GET /api/team/:id` |

### 2.4. İletişim Sayfası (`/iletisim`)

* **İletişim Bilgileri:** Telefon, E-posta, Adres listesi.
* **Konum:** Google Haritalar veya benzeri harita entegrasyonu.
* **İletişim Formu:**
    * Alanlar: İsim, E-posta, Telefon (Opsiyonel), Mesaj.
    * **Zorunlu:** Bir doğrulama mekanizması (Captcha) içermelidir.
    * Gönderim sonrası başarılı/hata mesajı gösterimi.

## 3. Tasarım Gereksinimleri

### 3.1. Responsive Tasarım
* **Tüm proje responsive olacak:** Mobil, tablet ve masaüstü cihazlarda optimum görüntüleme sağlayacak şekilde tasarlanmalıdır.
* **Breakpoint'ler:** xs (mobil), sm (tablet), md (küçük masaüstü), lg (büyük masaüstü) olarak Material-UI grid sistemi kullanılacaktır.

### 3.2. Card Tasarımı
* **Eşit Boyutlar:** Tüm cardlar (kategori cardları, makale cardları, ekip üyesi cardları vb.) eşit boyutlarda olacaktır.
* **Küçültülmüş Boyutlar:** Cardlar mevcut boyutlarından daha küçük olacak şekilde optimize edilecektir.
### 3.3. Dil Uyumluluğu
* **Tamamen dil uyumlu geliştirilecek:** Uygulamanın tüm metin içerikleri (statik metinler dahil) çok dilli destek alacak şekilde geliştirilecektir.
* **Çeviri anahtarları:** Tüm sabit metinler i18n çeviri anahtarları ile değiştirilecektir.
* **Dinamik dil değişimi:** Kullanıcı dil değiştirdiğinde tüm içerik anında güncellenecektir.