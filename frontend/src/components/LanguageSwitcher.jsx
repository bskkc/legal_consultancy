import React from 'react'
import { MenuItem, Select, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import LanguageIcon from '@mui/icons-material/Language'

const LANGS = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const newLang = e.target.value
    const currentPath = location.pathname
    const segments = currentPath.split('/').filter(Boolean)
    
    // Replace the language segment (first segment)
    if (segments.length > 0) {
      segments[0] = newLang
    } else {
      segments.push(newLang)
    }
    
    const newPath = '/' + segments.join('/')
    navigate(newPath)
    
    // store preference
    try {
      localStorage.setItem('lang', newLang)
    } catch (err) {}
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Select
        value={i18n.language || 'tr'}
        onChange={handleChange}
        size="small"
        renderValue={(value) => value.toUpperCase()}
        sx={{
          color: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          minWidth: 'unset',
          width: { xs: 'auto', md: 'auto' },
          height: 36,
          fontWeight: 600,
          fontSize: '0.85rem',
          transition: 'all 0.2s',
          '& .MuiSelect-select': {
            padding: '0 8px 0 12px !important',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '& .MuiSvgIcon-root': {
            color: '#ffffff',
            fontSize: '1.2rem',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#001f3f',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              mt: 1,
              '& .MuiMenuItem-root': {
                fontSize: '0.9rem',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                '&.Mui-selected': {
                  bgcolor: 'rgba(198, 40, 40, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(198, 40, 40, 0.3)',
                  },
                },
              },
            },
          },
        }}
      >
        {LANGS.map((l) => (
          <MenuItem key={l.code} value={l.code}>
            {l.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default LanguageSwitcher
