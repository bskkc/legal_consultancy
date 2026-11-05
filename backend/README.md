# Backend API - Legal Consultancy

Bu proje, Legal Consultancy uygulaması için Node.js/Express tabanlı RESTful API'sidir.

## Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB (yerel veya cloud)

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **.env dosyasını yapılandırın:**
```
MONGODB_URI=mongodb://localhost:27017/legal_consultancy
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
RECAPTCHA_SECRET=your_recaptcha_secret_key
```

3. **Sunucuyu başlatın:**

Geliştirme modunda (otomatik yeniden yükleme ile):
```bash
npm run dev
```

Üretim modunda:
```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

## API Endpointleri

### Public Endpointler (Kimlik Doğrulaması Gerekli Değil)

#### Kategoriler
- `GET /api/categories` - Tüm kategorileri getir (limit parametresi ile sınırlandırılabilir)
- `GET /api/articles/category/:slug` - Kategoriye ait makaleleri getir

#### Makaleler
- `GET /api/articles/:slug` - Makale detaylarını getir

#### Ekip
- `GET /api/team` - Ekip üyelerini listele

#### İletişim Formu
- `POST /api/contact` - İletişim formu gönder (reCAPTCHA doğrulaması gereklidir)
```json
{
  "name": "Ad Soyad",
  "email": "email@example.com",
  "message": "Mesaj içeriği",
  "recaptchaToken": "..."
}
```

### Admin Endpointleri (JWT Token Gerekli)

Tüm admin endpointlerine header'da token gereklidir:
```
Authorization: Bearer <token>
```

#### Kimlik Doğrulama
- `POST /api/auth/login` - Admin girişi
```json
{
  "username": "admin_username",
  "password": "password"
}
```

#### Kategoriler (Admin)
- `GET /api/admin/categories` - Tüm kategorileri getir
- `POST /api/admin/categories` - Yeni kategori oluştur
- `PUT /api/admin/categories/:id` - Kategori güncelle
- `DELETE /api/admin/categories/:id` - Kategori sil

#### Makaleler (Admin)
- `GET /api/admin/articles` - Tüm makaleleri getir
- `POST /api/admin/articles` - Yeni makale oluştur
- `PUT /api/admin/articles/:id` - Makale güncelle
- `DELETE /api/admin/articles/:id` - Makale sil

#### Ekip Üyeleri (Admin)
- `GET /api/admin/team` - Tüm ekip üyelerini getir
- `POST /api/admin/team` - Yeni ekip üyesi oluştur
- `PUT /api/admin/team/:id` - Ekip üyesi güncelle
- `DELETE /api/admin/team/:id` - Ekip üyesi sil

#### İletişim Formu Kayıtları (Admin)
- `GET /api/admin/contacts` - Tüm iletişim formu kayıtlarını getir

## Proje Yapısı

```
backend/
├── config/
│   └── database.js          # MongoDB bağlantısı
├── models/
│   ├── Category.js
│   ├── Article.js
│   ├── TeamMember.js
│   ├── ContactForm.js
│   └── User.js
├── middleware/
│   ├── auth.js              # JWT kimlik doğrulama middleware
│   └── recaptcha.js         # reCAPTCHA doğrulama middleware
├── routes/
│   ├── public.js            # Public endpointler
│   ├── auth.js              # Admin giriş endpoint'i
│   └── admin.js             # Admin işlemleri
├── .env                     # Ortam değişkenleri
├── package.json
├── server.js                # Ana uygulama dosyası
└── README.md
```

## Teknolojiler

- **Express.js** - Web framework
- **MongoDB** - Veritabanı
- **Mongoose** - MongoDB ODM
- **JWT** - Token tabanlı kimlik doğrulama
- **bcryptjs** - Şifre hashlama
- **CORS** - Cross-Origin Resource Sharing
- **axios** - HTTP istemci (reCAPTCHA doğrulama için)

## Notlar

- Tüm şifreler bcryptjs ile hashlenmiştir
- JWT token 24 saat geçerlidir
- reCAPTCHA doğrulaması, spam'i engellemek için iletişim formunda kullanılır
- Tüm slug alanları unique olmalıdır
