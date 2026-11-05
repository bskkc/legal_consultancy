import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Button, Card, CardMedia, Container, Paper, Grid, Stack } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { teamAPI } from '../services/api'
import { useTranslation } from 'react-i18next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

function TeamDetail() {
  const { id } = useParams()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  useEffect(() => {
    fetchMember()
  }, [id, i18n.language])

  const fetchMember = async () => {
    try {
      const response = await teamAPI.getById(id, i18n.language)
      setMember(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching team member:', error)
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

  if (!member) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 6 }}>
        <Typography variant="h4" color="error">
          {t('team.notFound') || 'Team member not found.'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/${i18n.language || 'tr'}/ekibimiz`)}
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
          onClick={() => navigate(`/${i18n.language || 'tr'}/ekibimiz`)}
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

        {/* Team Member Content */}
        <Grid container spacing={{ xs: 3, md: 5 }} sx={{ marginBottom: { xs: 5, md: 8 } }}>
          {/* Photo */}
          <Grid item xs={12} md={5}>
            {member.photo ? (
              <Card
                sx={{
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={member.photo}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: 450 },
                    objectFit: 'cover',
                  }}
                />
              </Card>
            ) : (
              <Paper
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 450 },
                  background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                }}
              >
                <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center' }}>
                  {t('team.noPhoto') || 'No photo available'}
                </Typography>
              </Paper>
            )}
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                padding: { xs: 3, md: 4 },
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0, 31, 63, 0.06)',
                height: '100%',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: '#001f3f',
                  marginBottom: 1,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  letterSpacing: '-0.01em',
                }}
              >
                {member.name}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: '#c62828',
                  fontWeight: 700,
                  marginBottom: 3,
                  fontSize: '1.15rem',
                  letterSpacing: '0.5px',
                }}
              >
                {member.title}
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.8,
                  color: '#1a1a1a',
                  fontSize: '1.05rem',
                  marginBottom: 4,
                }}
              >
                {member.bio}
              </Typography>

              {/* Social Links */}
              {member.socialLinks && (
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#001f3f',
                      marginBottom: 2.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {t('team.contact') || 'Contact'}
                  </Typography>

                  <Stack spacing={2}>
                    {member.socialLinks.email && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          padding: 2,
                          backgroundColor: 'rgba(0, 31, 63, 0.04)',
                          borderRadius: 2,
                          transition: 'all 0.3s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 31, 63, 0.08)',
                          },
                        }}
                      >
                        <EmailIcon sx={{ color: '#c62828', fontSize: 24 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666', display: 'block', marginBottom: 0.5 }}>
                            {t('team.email') || 'Email'}
                          </Typography>
                          <Typography
                            component="a"
                            href={`mailto:${member.socialLinks.email}`}
                            sx={{
                              color: '#001f3f',
                              fontWeight: 600,
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {member.socialLinks.email}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {member.socialLinks.linkedin && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          padding: 2,
                          backgroundColor: 'rgba(0, 31, 63, 0.04)',
                          borderRadius: 2,
                          transition: 'all 0.3s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 31, 63, 0.08)',
                          },
                        }}
                      >
                        <LinkedInIcon sx={{ color: '#c62828', fontSize: 24 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666', display: 'block', marginBottom: 0.5 }}>
                            LinkedIn
                          </Typography>
                          <Typography
                            component="a"
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#001f3f',
                              fontWeight: 600,
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {t('team.viewProfile') || 'View Profile'}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {member.socialLinks.twitter && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          padding: 2,
                          backgroundColor: 'rgba(0, 31, 63, 0.04)',
                          borderRadius: 2,
                          transition: 'all 0.3s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 31, 63, 0.08)',
                          },
                        }}
                      >
                        <TwitterIcon sx={{ color: '#c62828', fontSize: 24 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#666', display: 'block', marginBottom: 0.5 }}>
                            Twitter
                          </Typography>
                          <Typography
                            component="a"
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#001f3f',
                              fontWeight: 600,
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {t('team.viewProfile') || 'View Profile'}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Stack>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default TeamDetail
