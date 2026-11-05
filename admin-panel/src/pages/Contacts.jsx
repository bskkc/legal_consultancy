import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  IconButton,
  Divider,
  Grid,
  Chip,
  Stack,
  Card,
  CardContent
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloseIcon from '@mui/icons-material/Close'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MessageIcon from '@mui/icons-material/Message'
import { contactAPI } from '../services/api'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await contactAPI.getAll()
      setContacts(response.data)
      setError('')
    } catch (err) {
      setError('İletişim kayıtları yüklenemedi')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (contact) => {
    setSelectedContact(contact)
    setOpenDetail(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Ad Soyad',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="action" fontSize="small" />
          <Typography variant="body2" fontWeight="medium">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.2,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon color="action" fontSize="small" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'phone',
      headerName: 'Telefon',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon color="action" fontSize="small" />
          <Typography variant="body2">{params.value || '-'}</Typography>
        </Box>
      )
    },
    {
      field: 'message',
      headerName: 'Mesaj Özeti',
      flex: 2,
      valueGetter: (value, row) => (value || '').substring(0, 50) + '...',
    },
    {
      field: 'submissionDate',
      headerName: 'Gönderim Tarihi',
      flex: 1,
      valueGetter: (value, row) => new Date(value).toLocaleDateString('tr-TR'),
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTodayIcon color="action" fontSize="small" />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={() => handleView(params.row)}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Detay
        </Button>
      ),
    },
  ]

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          İletişim Kayıtları
        </Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchContacts}>
          Yenile
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={0} sx={{ height: 600, width: '100%', p: 2, border: '1px solid #e0e0e0' }}>
          <DataGrid
            rows={contacts}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
              },
            }}
            disableSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                color: '#333',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                },
                cursor: 'pointer'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              }
            }}
          />
        </Paper>
      )}

      <Dialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Mesaj Detayı
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDetail(false)}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedContact && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      GÖNDEREN
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon color="primary" />
                      <Typography variant="body1" fontWeight="medium">
                        {selectedContact.name}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      E-POSTA ADRESİ
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon color="primary" />
                      <Typography variant="body1">
                        {selectedContact.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      TELEFON NUMARASI
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon color="primary" />
                      <Typography variant="body1">
                        {selectedContact.phone || '-'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      GÖNDERİM TARİHİ
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon color="primary" />
                      <Typography variant="body1">
                        {new Date(selectedContact.submissionDate).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom sx={{ mt: 2 }}>
                  MESAJ İÇERİĞİ
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    minHeight: '150px'
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {selectedContact.message}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDetail(false)} variant="contained">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Contacts
