import React from 'react'
import { Box, Container, Typography, Grid, Stack, Divider, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        marginTop: 'auto',
        paddingY: { xs: 6, md: 10 },
        paddingX: { xs: 2, md: 4 },
        background: 'linear-gradient(180deg, #001f3f 0%, #000f1f 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{
            marginBottom: { xs: 6, md: 8 },
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#ffffff',
                  marginBottom: 3,
                  letterSpacing: '-0.5px',
                  background: 'linear-gradient(45deg, #fff, #ccc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('site.title')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  marginBottom: 4,
                  lineHeight: 1.8,
                  fontSize: '0.95rem',
                  maxWidth: '300px',
                }}
              >
                {t('home.aboutText')}
              </Typography>
              <Stack direction="row" spacing={2}>
                {[
                  { icon: <LinkedInIcon fontSize="small" />, href: "#" },
                  { icon: <TwitterIcon fontSize="small" />, href: "#" },
                  { icon: <EmailIcon fontSize="small" />, href: "#" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    sx={{
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: '#c62828',
                        borderColor: '#c62828',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 12px rgba(198, 40, 40, 0.3)',
                      },
                    }}
                  >
                    {item.icon}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  marginBottom: 3,
                  letterSpacing: '0.5px',
                }}
              >
                {t('menu.contact')}
              </Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.5, display: 'block', mb: 0.5 }}>
                      Telefon
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      +90 (XXX) XXX XX XX
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.5, display: 'block', mb: 0.5 }}>
                      E-posta
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      info@hukukburosu.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.5, display: 'block', mb: 0.5 }}>
                      Adres
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      İstanbul, Türkiye
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  marginBottom: 3,
                  letterSpacing: '0.5px',
                }}
              >
                {t('menu.articles')}
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: t('home.servicesTitle'), href: '#' },
                  { label: t('menu.team'), href: '#' },
                  { label: t('menu.about'), href: '#' },
                  { label: t('menu.contact'), href: '#' },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        color: '#ffffff',
                        transform: 'translateX(5px)',
                      },
                      '&::before': {
                        content: '""',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#c62828',
                        marginRight: '10px',
                        opacity: 0,
                        transition: 'all 0.3s',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  marginBottom: 3,
                  letterSpacing: '0.5px',
                }}
              >
                Yasal
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Gizlilik Politikası', href: '#' },
                  { label: 'Kullanım Şartları', href: '#' },
                  { label: 'KVKK Aydınlatma', href: '#' },
                  { label: 'Çerez Politikası', href: '#' },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        color: '#ffffff',
                        transform: 'translateX(5px)',
                      },
                      '&::before': {
                        content: '""',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#c62828',
                        marginRight: '10px',
                        opacity: 0,
                        transition: 'all 0.3s',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.6,
              fontSize: '0.9rem',
            }}
          >
            &copy; {currentYear} {t('site.title')}. Tüm hakları saklıdır.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.4,
              fontSize: '0.85rem',
            }}
          >
            Designed & Developed by LegalTech
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
