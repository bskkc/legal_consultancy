import React, { useState, useEffect } from 'react'
import { Box, Button, Alert, CircularProgress } from '@mui/material'
import { categoryAPI } from '../services/api'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      console.log('Kategoriler çekiliyor...')
      const response = await categoryAPI.getAll()
      console.log('Yanıt:', response)
      const data = Array.isArray(response.data) ? response.data : []
      setCategories(data)
      setLoading(false)
    } catch (err) {
      console.error('Hata:', err)
      setError('Kategoriler yüklenemedi: ' + err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginBottom: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Kategori Yönetimi</h1>
      <Button variant="contained" sx={{ marginBottom: 2 }}>
        Yeni Kategori Ekle
      </Button>

      <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 1 }}>
        <h3>Kategoriler ({categories.length})</h3>
        {categories && categories.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Adı</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{cat.name}</td>
                  <td style={{ padding: '10px' }}>{cat.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Kategori bulunmamaktadır.</p>
        )}
      </Box>
    </Box>
  )
}

export default Categories
