import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material'

function TeamForm({ open, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      title: '',
      bio: '',
      photo: '',
      socialLinks: {
        email: '',
        linkedin: '',
        twitter: '',
      },
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({
      name: '',
      title: '',
      bio: '',
      photo: '',
      socialLinks: { email: '', linkedin: '', twitter: '' },
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Ekip Üyesini Düzenle' : 'Yeni Ekip Üyesi Ekle'}</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField
          fullWidth
          label="Ad Soyad"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Ünvan"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Biyografi"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2, mb: 2 }}
        >
          Fotoğraf Yükle
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  photoFile: file,
                  photoPreview: URL.createObjectURL(file)
                }));
              }
            }}
          />
        </Button>

        {(formData.photoPreview || formData.photo) && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <img 
              src={formData.photoPreview || formData.photo} 
              alt="Preview" 
              style={{ maxHeight: 200, maxWidth: '100%', objectFit: 'contain' }} 
            />
          </Box>
        )}

        <Box sx={{ marginTop: 2, paddingTop: 2, borderTop: '1px solid #ddd' }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.socialLinks.email}
            onChange={handleSocialChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="LinkedIn"
            name="linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleSocialChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={formData.socialLinks.twitter}
            onChange={handleSocialChange}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!formData.name || !formData.title}>
          {initialData ? 'Güncelle' : 'Ekle'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeamForm
