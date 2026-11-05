# Admin Panel - Legal Consultancy

React ve Material-UI ile geliştirilmiş güvenli yönetim paneli.

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
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

Admin panel varsayılan olarak `http://localhost:3001` adresinde açılacaktır.

## Giriş Bilgileri

Backend'de bir admin kullanıcı oluşturmanız gerekir. MongoDB'de User modeline aşağıdaki gibi bir kullanıcı ekleyin:

```javascript
db.users.insertOne({
  username: "admin",
  password: "hashed_password", // bcrypt ile hashlı şifre
  role: "admin"
})
```

## Proje Yapısı

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           # Sol menü
│   │   ├── CategoryForm.jsx      # Kategori form
│   │   ├── ArticleForm.jsx       # Makale form (WYSIWYG editör ile)
│   │   └── TeamForm.jsx          # Ekip üyesi form
│   ├── pages/
│   │   ├── Login.jsx             # Giriş sayfası
│   │   ├── Categories.jsx        # Kategori yönetimi
│   │   ├── Articles.jsx          # Makale yönetimi
│   │   ├── Team.jsx              # Ekip üyesi yönetimi
│   │   └── Contacts.jsx          # İletişim kayıtları
│   ├── services/
│   │   └── api.js                # API istekleri
│   ├── App.jsx                   # Ana uygulama
│   └── main.jsx                  # Giriş noktası
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Özellikler

### Güvenlik
- ✅ JWT token tabanlı kimlik doğrulama
- ✅ Otomatik giriş yönlendirmesi (token süresi dolduğunda)
- ✅ Token localStorage'da saklanması

### Modüller

#### Kategori Yönetimi
- Kategori listesi (DataGrid)
- Yeni kategori ekleme
- Kategori düzenleme
- Kategori silme

#### Makale Yönetimi
- Makale listesi (DataGrid)
- Kategori filtresi
- WYSIWYG (Quill) editörü ile zengin metin desteği
- Görsel URL'i ekleme
- Yeni makale ekleme
- Makale düzenleme
- Makale silme

#### Ekip Üyesi Yönetimi
- Ekip üyesi listesi (fotoğraf önizlemesi ile)
- Fotoğraf yükleme
- Sosyal medya linkleri (LinkedIn, Twitter, Email)
- Yeni ekip üyesi ekleme
- Ekip üyesi düzenleme
- Ekip üyesi silme

#### İletişim Kayıtları
- Tüm iletişim formlarının listesi
- Mesaj özeti görüntüleme
- Detaylı mesaj görüntüleme
- Gönderim tarihi

## Teknolojiler

- **React 18** - UI kütüphanesi
- **React Router DOM** - Sayfa yönlendirmesi
- **Material-UI (MUI)** - UI bileşenleri
- **MUI Data Grid** - Veri tabloları
- **React Quill** - Zengin metin editörü
- **Axios** - HTTP istemci
- **Vite** - Geliştirme sunucusu

## Önemli Notlar

- Backend API'sinin çalışır durumda olması gerekir
- JWT token 24 saat geçerlidir
- Tüm CRUD işlemleri Real-time DataGrid'de güncellenir
- Silme işlemleri onay gerektir

## Build

Üretim için derleme:
```bash
npm run build
```

Preview:
```bash
npm run preview
```
