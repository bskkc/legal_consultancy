import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Button, Card, CardMedia, Container, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { articleAPI } from '../services/api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    fetchArticle()
  }, [slug, i18n.language])

  const fetchArticle = async () => {
    try {
      const response = await articleAPI.getBySlug(slug, i18n.language)
      setArticle(response.data)
      setLoading(false)
    } catch (error) {
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

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 6 }}>
        <Typography variant="h4" color="error">
          {t('articles.notFound') || 'Article not found.'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ marginTop: 3 }}
        >
          {t('buttons.back') || 'Back'}
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <Container maxWidth="lg" sx={{ paddingY: { xs: 4, md: 6 }, paddingX: { xs: 2, md: 4 } }}>
        {/* Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
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

        {/* Article Header */}
        <Paper
          elevation={0}
          sx={{
            padding: { xs: 4, md: 6 },
            marginBottom: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
            color: '#fff',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 31, 63, 0.2)',
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
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(198,40,40,0.15) 0%, rgba(198,40,40,0) 70%)',
              filter: 'blur(40px)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {article.category && (
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '6px 12px',
                  borderRadius: 2,
                  marginBottom: 2,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                {(article.category && ((article.category.translations && article.category.translations[i18n.language] && article.category.translations[i18n.language].name) || article.category.name))}
              </Typography>
            )}
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                marginBottom: 2,
                marginTop: 1.5,
                fontSize: { xs: '1.85rem', md: '2.75rem' },
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              {((article.translations && article.translations[i18n.language] && article.translations[i18n.language].title) || article.title)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.85,
                fontSize: '0.95rem',
              }}
            >
              {t('articles.lastUpdated') || 'Last updated'}: {new Date(article.updatedAt).toLocaleDateString(i18n.language === 'tr' ? 'tr-TR' : i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'ar' ? 'ar-EG' : 'en-US')}
            </Typography>
          </Box>
        </Paper>

        {/* Article Image */}
        {article.image && (
          <Card
            sx={{
              marginBottom: { xs: 4, md: 6 },
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              borderRadius: 3,
            }}
          >
            <CardMedia
              component="img"
              image={article.image}
              alt={article.title}
              sx={{
                width: '100%',
                height: { xs: 240, sm: 360, md: 480 },
                objectFit: 'cover',
              }}
            />
          </Card>
        )}

        {/* Article Content */}
        <Paper
          elevation={0}
          sx={{
            padding: { xs: 3, md: 5 },
            marginBottom: { xs: 5, md: 8 },
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0, 31, 63, 0.06)',
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              marginTop: '1.5em',
              marginBottom: '0.5em',
              color: '#001f3f',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
            },
            '& p': {
              marginBottom: '1.2em',
              lineHeight: 1.8,
              color: '#1a1a1a',
            },
            '& ul, & ol': {
              marginLeft: '1.5em',
              marginBottom: '1.2em',
              lineHeight: 1.8,
            },
            '& li': {
              marginBottom: '0.5em',
              color: '#1a1a1a',
            },
            '& a': {
              color: '#001f3f',
              textDecoration: 'underline',
              fontWeight: 500,
              '&:hover': {
                color: '#1a3d52',
              },
            },
          }}
        >
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: (article.translations && article.translations[i18n.language] && article.translations[i18n.language].content) || article.content,
            }}
            sx={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#333',
            }}
          />
        </Paper>
      </Container>
    </Box>
  )
}

export default ArticleDetail
