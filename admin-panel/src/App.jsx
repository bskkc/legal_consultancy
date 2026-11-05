import React, { useState, useEffect } from 'react'
import { Box, Container, AppBar, Toolbar, Typography, Button, Alert } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Articles from './pages/Articles'
import Team from './pages/Team'
import Contacts from './pages/Contacts'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  if (!isAuthenticated) {
    if (location.pathname !== '/login') {
      return <Navigate to="/login" replace />
    }
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel - Legal Consultancy
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: '64px',
          padding: 3,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<Navigate to="/categories" replace />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
