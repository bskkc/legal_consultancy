# Seed Data - Legal Consultancy

Bu script, veritabanına örnek veriler (seed data) ekler. Geliştirme ve test amaçları için kullanılır.

## İçeriği

### Admin Kullanıcısı
- **Kullanıcı Adı:** admin
- **Şifre:** admin123
- **Rol:** admin

### Kategoriler (10 adet)
1. Aile Hukuku
2. İş Hukuku
3. Ticari Hukuk
4. Ceza Hukuku
5. İdari Hukuk
6. Gayrimenkul Hukuku
7. Vergi Hukuku
8. Fikri Mülkiyet
9. Tüketici Hukuku
10. Uluslararası Hukuk

### Makaleler (11 adet)
Her kategoriye ilişkin örnek makaleler:
- Boşanma Davaları
- Velayet Davası
- İş Sözleşmesi
- İşsizlik Sigortası
- Limited Şirket Kuruluşu
- Ceza Yargılaması
- İdari Dava Prosedürü
- Gayrimenkul Satışında Yasal Haklar
- KDV Oranları
- Marka Tescili
- Tüketici Hakları

### Ekip Üyeleri (6 kişi)
1. **Av. Ali Yılmaz** - Kurucu Ortağı & Aile Hukuku Uzmanı
2. **Av. Ayşe Kaya** - İş Hukuku & Ticari Hukuk Avukatı
3. **Av. Mehmet Demir** - Ceza Hukuku ve Adli Tıp Avukatı
4. **Av. Fatma Şahin** - İdari Hukuk ve Vergi Hukuku Uzmanı
5. **Av. Hakan Güneş** - Gayrimenkul Hukuku ve İmar Hukuku
6. **Av. Zeynep Arslan** - Fikri Mülkiyet ve Patent Hukuku

## Kullanım

### Seed Data'yı Ekle

```bash
npm run seed
```

Bu komut:
1. Mevcut tüm verileri temizler
2. Yeni kategoriler ekler
3. Yeni makaleler ekler
4. Yeni ekip üyeleri ekler
5. Admin kullanıcısı oluşturur

### Çıktı

Başarılı olduğunda aşağıdaki gibi bir çıktı görürsünüz:

```
MongoDB connected successfully
Mevcut veriler temizleniyor...
Admin kullanıcısı oluşturuluyor...
✓ Admin kullanıcısı oluşturuldu: admin

Kategoriler oluşturuluyor...
✓ 10 kategori oluşturuldu

Makaleler oluşturuluyor...
✓ 11 makale oluşturuldu

Ekip üyeleri oluşturuluyor...
✓ 6 ekip üyesi oluşturuldu

✅ Seed data başarıyla oluşturuldu!

Giriş Bilgileri:
Kullanıcı Adı: admin
Şifre: admin123
```

## Dikkat

⚠️ **Uyarı:** `npm run seed` komutu, mevcut tüm verileri siler ve yeniden oluşturur. Üretim ortamında dikkatli kullanın!

## Admin Panel Girişi

Seed data oluşturduktan sonra admin paneline şu kimlikle giriş yapabilirsiniz:

- **URL:** http://localhost:3001
- **Kullanıcı Adı:** admin
- **Şifre:** admin123

## Script Dosyası

Script dosyası şu konumda bulunur: `backend/scripts/seed.js`

Verileri özelleştirmek istiyorsanız bu dosyayı düzenleyebilirsiniz.
