# Admin Panel Spesifikasyonları (React & MUI)

Bu doküman, site içeriğini yönetmek için kullanılan güvenli yönetim panelinin gereksinimlerini içerir.

## 1. Güvenlik ve Erişim

* **Giriş:** Admin paneline erişim, `/api/auth/login` endpoint'i üzerinden başarılı JWT doğrulamasından sonra sağlanır.
* **Oturum Yönetimi:** Kullanıcı oturumu sonlandığında (örneğin token süresi dolduğunda), otomatik olarak giriş sayfasına yönlendirme yapılmalıdır.

## 2. İçerik Yönetim Modülleri (CRUD)

Tüm yönetim modülleri için standart bir DataGrid (veri tablosu) arayüzü kullanılmalı ve filtreleme/arama özellikleri desteklenmelidir.

### 2.1. Kategori Yönetimi

* **Liste:** Tüm kategorileri gösteren tablo.
* **Ekle/Düzenle:** Yeni kategori adı ve slug oluşturma/güncelleme formu.
* **Silme:** Kategori silme işlevi (makaleler üzerindeki etkisi uyarısı ile).

### 2.2. Makale Yönetimi

* **Liste:** Tüm makalelerin listesi. Kategoriye göre filtreleme yapılabilmelidir.
* **Ekle/Düzenle Formu:**
    * Başlık, Slug, Özet, İçerik (WYSIWYG/Zengin Metin Editörü), Kategori Seçimi (Dropdown), Görsel Yükleme.
* **Silme:** Makale silme işlevi.

### 2.3. Ekip Üyesi Yönetimi

* **Liste:** Tüm ekip üyelerini gösteren tablo (isim, unvan, fotoğraf önizleme).
* **Ekle/Düzenle Formu:** İsim, Unvan, Biyografi, Fotoğraf Yükleme alanı.
* **Silme:** Ekip üyesi silme işlevi.

### 2.4. İletişim Kayıtları Görüntüleme

* **Liste:** `/api/admin/contacts` endpoint'inden çekilen tüm iletişim formu kayıtları listelenmelidir.
* **Görüntüleme:** Kayıtlar; İsim, E-posta, Mesajın ilk birkaç satırı, Gönderim Tarihi gibi alanları göstermelidir.
* **Detay:** Bir kayda tıklandığında tüm mesaj içeriği görüntülenebilmelidir.