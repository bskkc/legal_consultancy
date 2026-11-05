# API Dokümantasyon - Legal Consultancy

## Başlangıç

**Base URL:** `http://localhost:5000/api`

## Health Check

Sunucunun çalıştığını kontrol etmek için:

```
GET http://localhost:5000/health
```

**Yanıt:**
```json
{
  "status": "Server is running"
}
```

---

## Public API Endpointleri (Kimlik Doğrulaması Gerekli Değil)

### 1. Kategoriler Listesi

```
GET /categories
```

**Query Parametreleri:**
- `limit` (opsiyonel): Döndürülecek maksimum kategori sayısı

**Yanıt:**
```json
[
  {
    "_id": "6939bd89d561a56fa5c5cd1e",
    "name": "Aile Hukuku",
    "slug": "aile-hukuku",
    "createdAt": "2025-12-10T18:35:53.041Z",
    "updatedAt": "2025-12-10T18:35:53.041Z"
  }
]
```

---

### 2. Kategoriye Ait Makaleler

```
GET /articles/category/:slug
```

**Parametreler:**
- `slug`: Kategori slug'ı (örn. `aile-hukuku`)

**Yanıt:**
```json
[
  {
    "_id": "...",
    "category": {
      "_id": "...",
      "name": "Aile Hukuku",
      "slug": "aile-hukuku"
    },
    "title": "Boşanma Davaları: Adımlar ve Haklarınız",
    "slug": "bosanma-davaları-adımlar-haklarınız",
    "image": "https://via.placeholder.com/400x300?text=Aile+Hukuku",
    "summary": "Boşanma davası süreci hakkında kapsamlı bilgi ve yasal haklar",
    "content": "<h2>Boşanma Davaları...</h2>"
  }
]
```

---

### 3. Makale Detayı

```
GET /articles/:slug
```

**Parametreler:**
- `slug`: Makale slug'ı

**Yanıt:** Tek makale nesnesi (yukarıdaki format)

---

### 4. Ekip Listesi

```
GET /team
```

**Yanıt:**
```json
[
  {
    "_id": "...",
    "name": "Av. Ali Yılmaz",
    "title": "Kurucu Ortağı & Aile Hukuku Uzmanı",
    "photo": "https://via.placeholder.com/300x400?text=Ali+Yilmaz",
    "bio": "Ali Yılmaz, 20 yıldan fazla hukuki deneyime...",
    "socialLinks": {
      "email": "ali.yilmaz@legalconsultancy.com",
      "linkedin": "https://linkedin.com/in/aliyilmaz",
      "twitter": "https://twitter.com/aliyilmaz"
    },
    "createdAt": "2025-12-10T18:35:53.041Z"
  }
]
```

---

### 5. İletişim Formu Gönder

```
POST /contact
```

**Body:**
```json
{
  "name": "İsim Soyisim",
  "email": "email@example.com",
  "message": "Mesaj içeriği",
  "recaptchaToken": "token_from_google_recaptcha"
}
```

**Yanıt:**
```json
{
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "...",
    "name": "İsim Soyisim",
    "email": "email@example.com",
    "message": "Mesaj içeriği",
    "ipAddress": "127.0.0.1",
    "submissionDate": "2025-12-10T18:40:00.000Z"
  }
}
```

---

## Admin API Endpointleri (JWT Token Gerekli)

### Kimlik Doğrulama

Tüm admin isteklerinde header'a JWT token eklenmelidir:

```
Authorization: Bearer <token>
```

### 1. Admin Giriş

```
POST /auth/login
```

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Yanıt:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6939bd88d561a56fa5c5cd1c",
    "username": "admin",
    "role": "admin"
  }
}
```

---

### 2. Kategoriler (CRUD)

#### Tüm Kategorileri Listele
```
GET /admin/categories
```

#### Yeni Kategori Ekle
```
POST /admin/categories
```

**Body:**
```json
{
  "name": "Yeni Kategori",
  "slug": "yeni-kategori"
}
```

#### Kategori Güncelle
```
PUT /admin/categories/:id
```

**Body:**
```json
{
  "name": "Güncellenmiş Kategori",
  "slug": "guncellenmus-kategori"
}
```

#### Kategori Sil
```
DELETE /admin/categories/:id
```

---

### 3. Makaleler (CRUD)

#### Tüm Makaleleri Listele
```
GET /admin/articles
```

#### Yeni Makale Ekle
```
POST /admin/articles
```

**Body:**
```json
{
  "category": "category_id",
  "title": "Makale Başlığı",
  "slug": "makale-basligi",
  "summary": "Kısa özet",
  "content": "<h2>Makale içeriği HTML olarak</h2>",
  "image": "https://example.com/image.jpg"
}
```

#### Makale Güncelle
```
PUT /admin/articles/:id
```

**Body:** Yeni makale ekleme ile aynı

#### Makale Sil
```
DELETE /admin/articles/:id
```

---

### 4. Ekip Üyeleri (CRUD)

#### Tüm Ekip Üyelerini Listele
```
GET /admin/team
```

#### Yeni Ekip Üyesi Ekle
```
POST /admin/team
```

**Body:**
```json
{
  "name": "Av. Ad Soyad",
  "title": "Ünvanı",
  "photo": "https://example.com/photo.jpg",
  "bio": "Biyografi",
  "socialLinks": {
    "email": "email@example.com",
    "linkedin": "https://linkedin.com/...",
    "twitter": "https://twitter.com/..."
  }
}
```

#### Ekip Üyesini Güncelle
```
PUT /admin/team/:id
```

**Body:** Yeni ekip üyesi ekleme ile aynı

#### Ekip Üyesini Sil
```
DELETE /admin/team/:id
```

---

### 5. İletişim Kayıtları

#### Tüm İletişim Kayıtlarını Listele
```
GET /admin/contacts
```

**Yanıt:**
```json
[
  {
    "_id": "...",
    "name": "İsim Soyisim",
    "email": "email@example.com",
    "message": "Mesaj içeriği",
    "ipAddress": "127.0.0.1",
    "submissionDate": "2025-12-10T18:40:00.000Z"
  }
]
```

---

## Hata Yanıtları

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## Test Örnekleri (PowerShell)

### Health Check
```powershell
(Invoke-WebRequest -Uri 'http://localhost:5000/health').Content
```

### Kategoriler
```powershell
(Invoke-WebRequest -Uri 'http://localhost:5000/api/categories').Content | ConvertFrom-Json
```

### Admin Giriş
```powershell
$body = @{username='admin'; password='admin123'} | ConvertTo-Json
$response = Invoke-WebRequest -Uri 'http://localhost:5000/api/auth/login' -Method Post -ContentType 'application/json' -Body $body
$response.Content | ConvertFrom-Json
```

---

## Port Bilgileri

| Hizmet | Port | URL |
|--------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend | 3000 | http://localhost:3000 |
| Admin Panel | 3001 | http://localhost:3001 |

---

## Önemli Notlar

1. Tüm admin işlemleri JWT token gerektirir
2. Token 24 saat geçerlidir
3. reCAPTCHA doğrulaması iletişim formu için zorunludur
4. Tüm slug alanları unique olmalıdır
5. Kategoriler birden fazla makale barındırabilir
