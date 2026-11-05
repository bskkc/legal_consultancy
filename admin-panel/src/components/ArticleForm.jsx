import React, { useState } from 'react'
import { slugify } from '../utils'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function ArticleForm({ open, onClose, onSubmit, initialData = null, categories = [] }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      slug: '',
      summary: '',
      content: '',
      category: '',
      image: '',
      translations: {
        tr: { title: '', slug: '', summary: '', content: '' },
        en: { title: '', slug: '', summary: '', content: '' },
        ru: { title: '', slug: '', summary: '', content: '' },
        ar: { title: '', slug: '', summary: '', content: '' },
      },
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
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
        if (parts.length === 3 && parts[0] === 'translations' && parts[2] === 'title') {
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
        if (name === 'title') {
            newData.slug = slugify(value)
        }
        return newData
      })
    }
  }

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({ title: '', slug: '', summary: '', content: '', category: '', image: '', translations: { tr: { title: '', slug: '', summary: '', content: '' }, en: { title: '', slug: '', summary: '', content: '' }, ru: { title: '', slug: '', summary: '', content: '' }, ar: { title: '', slug: '', summary: '', content: '' } } })
  }

  const LANGS = ['tr', 'en', 'ru', 'ar']
  const [tab, setTab] = useState(0)
  const handleTab = (e, v) => setTab(v)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Makaleyi Düzenle' : 'Yeni Makale Ekle'}</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <TextField fullWidth label="Başlık (TR)" name="title" value={formData.title} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Slug (Otomatik)" name="slug" value={formData.slug} margin="normal" disabled helperText="Slug otomatik oluşturulur" />

        <FormControl fullWidth margin="normal">
          <InputLabel>Kategori</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Kategori"
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Özet (TR)"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />

        <TextField
          fullWidth
          label="Görsel URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          margin="normal"
        />

        <label style={{ display: 'block', marginTop: '16px', marginBottom: '8px' }}>İçerik (TR)</label>
        <ReactQuill value={formData.content} onChange={handleContentChange} />

        {/* Translations inputs (tabbed) */}
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
                <TextField fullWidth label={`Başlık (${lng.toUpperCase()})`} name={`translations.${lng}.title`} value={formData.translations?.[lng]?.title || ''} onChange={handleChange} margin="normal" />
                <TextField fullWidth label={`Slug (${lng.toUpperCase()} - Otomatik)`} name={`translations.${lng}.slug`} value={formData.translations?.[lng]?.slug || ''} margin="normal" disabled />
                <TextField fullWidth label={`Özet (${lng.toUpperCase()})`} name={`translations.${lng}.summary`} value={formData.translations?.[lng]?.summary || ''} onChange={handleChange} margin="normal" multiline rows={3} />
                <Box sx={{ mt: 2 }}>
                  <label style={{ display: 'block', marginBottom: 8 }}>İçerik ({lng.toUpperCase()})</label>
                  <ReactQuill value={formData.translations?.[lng]?.content || ''} onChange={(val) => setFormData((prev) => ({ ...prev, translations: { ...prev.translations, [lng]: { ...prev.translations[lng], content: val } } }))} />
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ marginTop: 2 }}>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!formData.title || !formData.category}>
          {initialData ? 'Güncelle' : 'Ekle'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArticleForm
