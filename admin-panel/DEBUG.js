// Admin Panel Debug ve Test Dosyası
// Bu dosyayı tarayıcı konsolunda çalıştırabilirsiniz

console.log('=== Admin Panel Debug Info ===')
console.log('Token:', localStorage.getItem('authToken') ? '✓ Mevcut' : '✗ Yok')
console.log('Sayfa URL:', window.location.href)
console.log('React root element:', document.getElementById('root'))

// API test fonksiyonu
window.testAPI = async function() {
  try {
    const response = await fetch('http://localhost:5000/api/categories')
    const data = await response.json()
    console.log('API Kategoriler:', data)
    return data
  } catch (error) {
    console.error('API Hatası:', error)
    return null
  }
}

// Giriş fonksiyonu test
window.testLogin = async function() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    })
    const data = await response.json()
    console.log('Giriş Yanıtı:', data)
    if (data.token) {
      localStorage.setItem('authToken', data.token)
      console.log('Token kaydedildi. Sayfayı yenileyiniz.')
    }
    return data
  } catch (error) {
    console.error('Giriş Hatası:', error)
    return null
  }
}

console.log('Hazır komutlar:')
console.log('testAPI() - API test')
console.log('testLogin() - Giriş test')
