import React, { useState, useEffect } from 'react'
import { Box, Button, Alert, CircularProgress, Typography, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import TeamForm from '../components/TeamForm'
import { teamAPI } from '../services/api'

function Team() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openForm, setOpenForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const response = await teamAPI.getAll()
      setTeamMembers(response.data)
      setError('')
    } catch (err) {
      setError('Ekip üyeleri yüklenemedi')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingMember(null)
    setOpenForm(true)
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setOpenForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) {
      try {
        await teamAPI.delete(id)
        setSuccess('Ekip üyesi başarıyla silindi')
        fetchTeamMembers()
      } catch (err) {
        setError('Silme işlemi başarısız oldu')
      }
    }
  }

  const handleFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('title', data.title);
      formData.append('bio', data.bio);
      
      if (data.photoFile) {
        formData.append('photo', data.photoFile);
      } else if (data.photo) {
        formData.append('photo', data.photo);
      }

      if (data.socialLinks) {
        formData.append('socialLinks', JSON.stringify(data.socialLinks));
      }
      
      if (editingMember) {
        await teamAPI.update(editingMember._id, formData)
        setSuccess('Ekip üyesi başarıyla güncellendi')
      } else {
        await teamAPI.create(formData)
        setSuccess('Ekip üyesi başarıyla eklendi')
      }
      setOpenForm(false)
      fetchTeamMembers()
    } catch (err) {
      setError(err.response?.data?.message || 'İşlem başarısız')
    }
  }

  const columns = [
    { field: 'name', headerName: 'Ad Soyad', flex: 1 },
    { field: 'title', headerName: 'Ünvan', flex: 1 },
    {
      field: 'photo',
      headerName: 'Fotoğraf',
      width: 100,
      renderCell: (params) =>
        params.row.photo ? (
          <img
            src={params.row.photo}
            alt={params.row.name}
            style={{ maxHeight: 50, maxWidth: 50 }}
          />
        ) : (
          '-'
        ),
    },
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
          Ekip Üyesi Yönetimi
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew} sx={{ px: 3 }}>
          Yeni Ekip Üyesi
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
            rows={teamMembers}
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

      <TeamForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        initialData={editingMember}
      />
    </Box>
  )
}

export default Team
