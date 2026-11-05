import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'ar', label: 'AR' },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value)
    try {
      localStorage.setItem('admin_lang', e.target.value)
    } catch (err) {}
  }

  return (
    <Select value={i18n.language || 'tr'} onChange={handleChange} size="small">
      {LANGS.map((l) => (
        <MenuItem key={l.code} value={l.code}>
          {l.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default LanguageSwitcher
