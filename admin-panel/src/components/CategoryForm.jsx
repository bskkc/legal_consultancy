import React, { useState } from 'react'
import { slugify } from '../utils'
import {
  Box,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from '@mui/material'

function CategoryForm({ open, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      slug: '',
      icon: '',
      translations: {
        tr: { name: '', slug: '' },
        en: { name: '', slug: '' },
        ru: { name: '', slug: '' },
        ar: { name: '', slug: '' },
      },
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    // support nested keys like translations.tr.name
    if (name.includes('.')) {
      const parts = name.split('.')
      setFormData((prev) => {
        const copy = JSON.parse(JSON.stringify(prev || {}))
        let cur = copy
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {}
          cur = cur[parts[i]]
        }
        cur[parts[parts.length - 1]] = value
        
        // Auto-generate slug for translations
        if (parts.length === 3 && parts[0] === 'translations' && parts[2] === 'name') {
            const lang = parts[1];
            if (copy.translations[lang]) {
                copy.translations[lang].slug = slugify(value);
            }
        }
        
        return copy
      })
    } else {
      setFormData((prev) => {
        const newData = { ...prev, [name]: value }
        if (name === 'name') {
            newData.slug = slugify(value)
        }
        return newData
      })
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({
      name: '',
      slug: '',
      icon: '',
      translations: {
        tr: { name: '', slug: '' },
        en: { name: '', slug: '' },
        ru: { name: '', slug: '' },
        ar: { name: '', slug: '' },
      },
    })
  }

  const [tab, setTab] = useState(0)
  const LANGS = ['tr', 'en', 'ru', 'ar']

  const handleTab = (e, v) => setTab(v)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField
          fullWidth
          label="Kategori Adı (varsayılan - TR)"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Slug (Otomatik)"
          name="slug"
          value={formData.slug}
          margin="normal"
          disabled
          helperText="Slug otomatik oluşturulur"
        />
        <TextField
          fullWidth
          label="İkon Adı (MUI Icon)"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          margin="normal"
          placeholder="örn: Gavel, Business, Home"
        />

        {/* Translation fields (tabbed) */}
        <Box sx={{ mt: 2 }}>
          <Tabs value={tab} onChange={handleTab} variant="fullWidth">
            <Tab label="TR" />
            <Tab label="EN" />
            <Tab label="RU" />
            <Tab label="AR" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {LANGS.map((lng, idx) => (
              <div key={lng} style={{ display: idx === tab ? 'block' : 'none' }}>
                <TextField
                  fullWidth
                  label={`Ad (${lng.toUpperCase()})`}
                  name={`translations.${lng}.name`}
                  value={formData.translations?.[lng]?.name || ''}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label={`Slug (${lng.toUpperCase()} - Otomatik)`}
                  name={`translations.${lng}.slug`}
                  value={formData.translations?.[lng]?.slug || ''}
                  margin="normal"
                  disabled
                />
              </div>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!formData.name}>
          {initialData ? 'Güncelle' : 'Ekle'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryForm
