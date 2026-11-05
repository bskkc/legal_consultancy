import React, { useState, useEffect } from 'react'
import { Box, Button, Alert, CircularProgress, Typography, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import CategoryForm from '../components/CategoryForm'
import { categoryAPI } from '../services/api'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [openForm, setOpenForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await categoryAPI.getAll()
      setCategories(response.data)
      setError('')
    } catch (err) {
      setError('Kategoriler yüklenemedi')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setOpenForm(true)
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setOpenForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await categoryAPI.delete(id)
        setSuccess('Kategori başarıyla silindi')
        fetchCategories()
      } catch (err) {
        setError('Silme işlemi başarısız oldu')
      }
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, formData)
        setSuccess('Kategori başarıyla güncellendi')
      } else {
        await categoryAPI.create(formData)
        setSuccess('Kategori başarıyla eklendi')
      }
      setOpenForm(false)
      fetchCategories()
    } catch (err) {
      setError(err.response?.data?.message || 'İşlem başarısız')
    }
  }

  const columns = [
    { field: 'name', headerName: 'Kategori Adı', flex: 1 },
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
          Kategori Yönetimi
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew} sx={{ px: 3 }}>
          Yeni Kategori
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={0} sx={{ height: 500, width: '100%', p: 2, border: '1px solid #e0e0e0' }}>
          <DataGrid
            rows={categories}
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

      <CategoryForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
      />
    </Box>
  )
}

export default Categories
