import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Articles from './pages/Articles'
import ArticlesByCategory from './pages/ArticlesByCategory'
import ArticleDetail from './pages/ArticleDetail'
import Team from './pages/Team'
import TeamDetail from './pages/TeamDetail'
import Contact from './pages/Contact'
import { Container } from '@mui/material'
import LocaleLayout from './LocaleLayout'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <WhatsAppButton />
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/tr" replace />} />
            <Route path="/:lng" element={<LocaleLayout />}>
              <Route index element={<Home />} />
              <Route path="hakkimizda" element={<About />} />
              <Route path="makaleler" element={<Articles />} />
              <Route path="makaleler/:slug" element={<ArticlesByCategory />} />
              <Route path="makale/:slug" element={<ArticleDetail />} />
              <Route path="ekibimiz" element={<Team />} />
              <Route path="ekibimiz/:id" element={<TeamDetail />} />
              <Route path="iletisim" element={<Contact />} />
            </Route>
          </Routes>
        </>
        <Footer />
      </div>
    </Router>
  )
}

export default App
