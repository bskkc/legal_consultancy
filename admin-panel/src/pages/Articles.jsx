import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Alert, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import ArticleForm from '../components/ArticleForm'
import { articleAPI, categoryAPI } from '../services/api'

function Articles() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [openForm, setOpenForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [filterCategory, setFilterCategory] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    fetchArticles()
    fetchCategories()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await articleAPI.getAll()
      setArticles(response.data)
      setError('')
    } catch (err) {
      setError('Makaleler yüklenemedi')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      setCategories(response.data)
    } catch (err) {
      console.error('Kategoriler yüklenemedi', err)
    }
  }

  const handleAddNew = () => {
    setEditingArticle(null)
    setOpenForm(true)
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setOpenForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
      try {
        await articleAPI.delete(id)
        setSuccess('Makale başarıyla silindi')
        fetchArticles()
      } catch (err) {
        setError('Silme işlemi başarısız oldu')
      }
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingArticle) {
        await articleAPI.update(editingArticle._id, formData)
        setSuccess('Makale başarıyla güncellendi')
      } else {
        await articleAPI.create(formData)
        setSuccess('Makale başarıyla eklendi')
      }
      setOpenForm(false)
      fetchArticles()
    } catch (err) {
      setError(err.response?.data?.message || 'İşlem başarısız')
    }
  }

  const filteredArticles = filterCategory
    ? articles.filter((article) => article.category?._id === filterCategory)
    : articles

  const columns = [
    { field: 'title', headerName: 'Başlık', flex: 1 },
    {
      field: 'category',
      headerName: 'Kategori',
      flex: 1,
      valueGetter: (value, row) => {
        if (!value) return '-'
        const cat = value
        if (typeof cat === 'string') return '-' // raw id
        if (cat.name) return cat.name
        const lang = i18n?.language || 'tr'
        const transName = cat.translations?.[lang]?.name
        if (transName) return transName
        // fallback to any available translation
        const order = ['tr', 'en', 'ru', 'ar']
        for (const l of order) {
          if (cat.translations?.[l]?.name) return cat.translations[l].name
        }
        return '-'
      },
    },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Düzenle
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row._id)}
          >
            Sil
          </Button>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Makale Yönetimi
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew} sx={{ px: 3 }}>
          Yeni Makale
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {success}
        </Alert>
      )}

      <FormControl sx={{ marginBottom: 3, minWidth: 200 }}>
        <InputLabel>Kategori Filtrele</InputLabel>
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          label="Kategori Filtrele"
        >
          <MenuItem value="">Tümü</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={0} sx={{ height: 500, width: '100%', p: 2, border: '1px solid #e0e0e0' }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            disableSelectionOnClick
            sx={{ border: 'none' }}
          />
        </Paper>
      )}

      <ArticleForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingArticle}
        categories={categories}
      />
    </Box>
  )
}

export default Articles
