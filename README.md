# Legal Consultancy

Hukuk danışmanlığı ofisleri için hazırlanmış web platformu. Ziyaretçiler hizmet alanlarını, makaleleri ve ekip üyelerini görüntüleyip iletişim formu gönderebilir; yöneticiler içerikleri yönetim panelinden düzenleyebilir.

## Proje bileşenleri

- **`frontend/`** — React ve Vite ile hazırlanmış, Türkçe, İngilizce, Rusça ve Arapça arayüzü destekleyen ziyaretçi sitesi.
- **`admin-panel/`** — Kategori, makale, ekip üyesi ve iletişim kayıtlarının yönetildiği React tabanlı panel.
- **`backend/`** — MongoDB ve Express kullanan REST API; JWT ile yönetici kimlik doğrulaması ve iletişim formu için reCAPTCHA doğrulaması.

## Gereksinimler

- Node.js ve npm
- Yerel veya bulut üzerinde çalışan MongoDB
- İletişim formunu kullanmak için reCAPTCHA anahtarları

## Kurulum ve çalıştırma

Önce depo kökünde ve ardından her uygulama klasöründe bağımlılıkları yükleyin. Kök bağımlılık, backend'in kullandığı dosya yükleme paketini sağlar:

```bash
npm install

cd backend
npm install
```

`backend/.env` dosyasını oluşturun:

```dotenv
MONGODB_URI=mongodb://localhost:27017/legal_consultancy
JWT_SECRET=guclu-ve-gizli-bir-anahtar
RECAPTCHA_SECRET=recaptcha-gizli-anahtariniz
PORT=5000
```

Backend'i `backend/` klasöründe başlatın:

```bash
npm run dev
```

Ardından iki ayrı terminalde frontend ve yönetim panelini başlatın:

```bash
cd frontend
npm install
npm run dev
```

```bash
cd admin-panel
npm install
npm run dev
```

Varsayılan adresler:

| Bileşen | Adres |
| --- | --- |
| Web sitesi | http://localhost:3000 |
| Yönetim paneli | http://localhost:3001 |
| Backend API | http://localhost:5000 |
| Backend sağlık kontrolü | http://localhost:5000/health |

Frontend ve yönetim paneli, varsayılan olarak API isteklerini `http://localhost:5000/api` adresine gönderir. Farklı bir API adresi kullanmak için ilgili uygulamanın `.env` dosyasına `VITE_API_URL` ekleyin.

## Örnek veriler

İsteğe bağlı örnek verileri eklemek için `backend/` klasöründe çalıştırın:

```bash
npm run seed
```

**Uyarı:** Seed komutu mevcut kullanıcı, kategori, makale ve ekip üyesi verilerini silip örnek verilerle değiştirir. Yerel geliştirme içindir; mevcut verilerin bulunduğu veritabanında veya üretimde çalıştırmayın. Örnek yönetici hesabı `admin` / `admin123` bilgileriyle oluşturulur; üretimde bu hesabı kullanmayın.

## API ve ek dokümantasyon

- API uç noktaları: [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md)
- Backend ayrıntıları: [`backend/README.md`](backend/README.md)
- Frontend ayrıntıları: [`frontend/README.md`](frontend/README.md)
- Yönetim paneli ayrıntıları: [`admin-panel/README.md`](admin-panel/README.md)
- Test yönergeleri: [`TESTING_GUIDE.md`](TESTING_GUIDE.md)
- Teknik özellikler: [`specs/`](specs/)
