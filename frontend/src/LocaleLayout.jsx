import React, { useEffect } from 'react'
import { Outlet, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SUPPORTED = ['tr', 'en', 'ru', 'ar']

function LocaleLayout({ children }) {
  const { lng } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = SUPPORTED.includes(lng) ? lng : 'tr'
    if (i18n.language !== lang) i18n.changeLanguage(lang)
    // set document direction for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl'
      document.body.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
      document.body.dir = 'ltr'
    }
    // set document title from translations
    try {
      const title = i18n.getFixedT(lang)('site.title') || 'Legal Consultancy'
      document.title = title
    } catch (err) {}
  }, [lng, i18n])

  if (!lng) return <Navigate to="/tr" replace />
  if (!SUPPORTED.includes(lng)) return <Navigate to="/tr" replace />

  return <Outlet />
}

export default LocaleLayout
