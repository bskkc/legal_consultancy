import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Button, Container, Paper } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { articleAPI } from '../services/api'
import { useTranslation } from 'react-i18next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function ArticlesByCategory() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    fetchArticles()
  }, [slug, i18n.language])

  const fetchArticles = async () => {
    try {
      const response = await articleAPI.getByCategory(slug, i18n.language)
      setArticles(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
          color: '#fff',
          paddingTop: { xs: 12, md: 20 },
          paddingBottom: { xs: 12, md: 20 },
          marginBottom: { xs: 5, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
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
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Decorative Circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(198,40,40,0.15) 0%, rgba(198,40,40,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(30px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', md: '3.25rem' },
              marginBottom: 2,
              letterSpacing: '-0.02em',
              textTransform: 'capitalize',
              color: '#ffffff',
              textShadow: '0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {slug.replace(/-/g, ' ')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 1.5,
              opacity: 0.95,
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: 500,
              lineHeight: 1.7,
              color: '#ffffff',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)',
            }}
          >
            {t('articles.categoryLabel')} makaleleri
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingX: { xs: 2, md: 4 } }}>
        {/* Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/${i18n.language || 'tr'}/makaleler`)}
          sx={{
            marginBottom: 4,
            color: '#001f3f',
            fontWeight: 600,
            padding: '8px 12px',
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 31, 63, 0.06)',
            },
          }}
        >
          {t('buttons.back') || 'Back'}
        </Button>

        {articles.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              padding: { xs: 4, md: 6 },
              textAlign: 'center',
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              marginBottom: { xs: 5, md: 8 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#666',
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              {t('articles.noArticles') || 'Bu kategoride makale bulunmamaktadır.'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(`/${i18n.language || 'tr'}/makaleler`)}
              sx={{
                marginTop: 2,
                backgroundColor: '#001f3f',
                '&:hover': {
                  backgroundColor: '#003366',
                },
              }}
            >
              {t('buttons.backToArticles') || 'Tüm Makalelere Dön'}
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ marginBottom: { xs: 5, md: 8 }, paddingY: { xs: 4, md: 6 } }} alignItems="stretch">
            {articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    height: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: '5px solid #001f3f',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 20px 48px rgba(0,0,0,0.16)',
                    },
                  }}
                  onClick={() => navigate(`/${i18n.language || 'tr'}/makale/${article.slug}`)}
                >
                  {article.image ? (
                    <CardMedia
                      component="img"
                      image={article.image}
                      alt={article.title}
                      sx={{
                        height: 240,
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 240,
                        background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
                        {t('articles.noImage') || 'No image'}
                      </Typography>
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1, padding: { xs: 2.5, md: 3.5 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#001f3f',
                        marginBottom: 1.5,
                        fontSize: '1.15rem',
                        lineHeight: 1.4,
                        minHeight: '2.8em',
                      }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      paragraph
                      sx={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: 2,
                      }}
                    >
                      {article.summary}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#c62828',
                        color: '#fff',
                        fontWeight: 600,
                        padding: '8px 16px',
                        marginTop: 'auto',
                        '&:hover': {
                          backgroundColor: '#d32f2f',
                        },
                      }}
                    >
                      {t('buttons.readMore') || 'Devamını Oku'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default ArticlesByCategory
