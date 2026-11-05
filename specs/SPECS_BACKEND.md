# Backend Spesifikasyonları (Node.js/Express & MongoDB)

Bu doküman, uygulamanın iş mantığını ve veri akışını yöneten Backend API'sinin gereksinimlerini ve veri modellerini içerir.

## 1. Veritabanı Modelleri (Mongoose Şemaları)

| Model Adı | Açıklama | Alanlar | İlişkiler |
| :--- | :--- | :--- | :--- |
| **Category** | Makale Kategorileri. | `name`, `slug` (Unique) | Article (1:N) |
| **Article** | Blog Makaleleri. | `category` (ID), `title`, `slug` (Unique), `image`, `content`, `summary` | Category (N:1) |
| **TeamMember** | Ekipteki avukatlar ve danışmanlar. | `name`, `title`, `photo`, `bio`, `socialLinks` | - |
| **ContactForm** | İletişim Formu verileri. | `name`, `email`, `message`, `ipAddress`, `submissionDate` | - |
| **User** | Admin Panel kullanıcıları. | `username`, `password` (Hashed), `role` | - |

## 2. RESTful API Endpointleri

Tüm endpoint'ler `/api/` öneki ile başlar. Admin endpoint'leri, geçerli bir JWT Token gerektirir.

### 2.1. Public Endpointler

| İşlem | URL | Metot | Açıklama | Query Parametreleri |
| :--- | :--- | :--- | :--- | :--- |
| Tüm Kategoriler | `/categories` | `GET` | Anasayfa ve Makaleler sayfası için. | `?limit=5` (Anasayfa için) |
| Kategori Makaleleri | `/articles/category/:slug` | `GET` | Belirli bir kategoriye ait makaleler. | - |
| Makale Detay | `/articles/:slug` | `GET` | Tek bir makalenin detayları. | - |
| Ekip Listesi | `/team` | `GET` | Ekibimiz sayfası için. | - |
| İletişim Formu | `/contact` | `POST` | Yeni form verisi kaydı. **(Captchha doğrulaması zorunludur)** | - |

### 2.2. Admin (Authenticated) Endpointler

| İşlem | URL | Metot | Açıklama |
| :--- | :--- | :--- |
| Admin Giriş | `/auth/login` | `POST` | Giriş ve JWT Token oluşturma. |
| CRUD Kategoriler | `/admin/categories` | `GET, POST, PUT, DELETE` | Kategori oluşturma, güncelleme, silme. |
| CRUD Makaleler | `/admin/articles` | `GET, POST, PUT, DELETE` | Makale oluşturma, güncelleme, silme. |
| CRUD Ekip Üyeleri | `/admin/team` | `GET, POST, PUT, DELETE` | Ekip üyesi yönetimi. |
| Form Kayıtları | `/admin/contacts` | `GET` | Tüm iletişim formu kayıtlarını listeleme. |

## 3. Güvenlik ve Doğrulama

* **Admin Girişi:** Kullanıcı adı ve şifre ile giriş yapılır, başarılı girişte **JSON Web Token (JWT)** oluşturulur.
* **Yetkilendirme:** `/admin` ile başlayan tüm rotalar, header'da geçerli bir JWT taşımayı zorunlu kılar.
* **Form Koruması:** `/contact` POST isteği, Spam'i engellemek için bir **reCAPTCHA** veya benzeri doğrulama içermelidir.