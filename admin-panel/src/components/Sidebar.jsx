import React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category'
import ArticleIcon from '@mui/icons-material/Article'
import GroupIcon from '@mui/icons-material/Group'
import MailIcon from '@mui/icons-material/Mail'
import '../i18n'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const DRAWER_WIDTH = 240

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const menuItems = [
    { label: t('menu.categories') || 'Kategoriler', path: '/categories', icon: <CategoryIcon /> },
    { label: t('menu.articles') || 'Makaleler', path: '/articles', icon: <ArticleIcon /> },
    { label: t('menu.team') || 'Ekip Üyeleri', path: '/team', icon: <GroupIcon /> },
    { label: t('menu.contacts') || 'İletişim Kayıtları', path: '/contacts', icon: <MailIcon /> },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          marginTop: '64px',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
