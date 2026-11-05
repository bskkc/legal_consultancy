import React from 'react'
import './i18n'
import './styles.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTranslation } from 'react-i18next'

// Add Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)

function Root() {
  const { i18n } = useTranslation()
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'

  React.useEffect(() => {
    document.documentElement.dir = dir
    document.body.dir = dir
  }, [dir])

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: dir,
        palette: {
          primary: { main: '#001f3f' },
          secondary: { main: '#c62828' },
          background: { default: '#f8f9fa', paper: '#ffffff' },
          text: { primary: '#111827', secondary: '#4b5563' },
          error: { main: '#dc2626' },
          warning: { main: '#f59e0b' },
          info: { main: '#3b82f6' },
          success: { main: '#10b981' },
        },
        typography: {
          fontFamily: '"Inter", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 800, fontSize: '3.5rem', letterSpacing: '-0.02em', fontFamily: '"Poppins", sans-serif' },
          h2: { fontWeight: 800, fontSize: '2.75rem', letterSpacing: '-0.015em', fontFamily: '"Poppins", sans-serif' },
          h3: { fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.01em', fontFamily: '"Poppins", sans-serif' },
          h4: { fontWeight: 700, fontSize: '1.75rem', fontFamily: '"Poppins", sans-serif' },
          h5: { fontWeight: 700, fontSize: '1.5rem', fontFamily: '"Poppins", sans-serif' },
          h6: { fontWeight: 700, fontSize: '1.25rem', fontFamily: '"Poppins", sans-serif' },
          body1: { fontSize: '1rem', lineHeight: 1.75 },
          body2: { fontSize: '0.875rem', lineHeight: 1.6 },
          button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                padding: '10px 24px',
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              },
              contained: {
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              },
              outlined: {
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  transition: 'all 0.3s',
                  '&:hover fieldset': {
                    borderColor: '#001f3f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#001f3f',
                    boxShadow: '0 0 0 3px rgba(0, 31, 63, 0.1)',
                  },
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
              },
            },
          },
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [dir]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
