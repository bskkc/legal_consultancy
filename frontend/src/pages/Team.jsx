import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Button,
  Paper,
  Stack,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { teamAPI } from "../services/api";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    fetchTeamMembers();
  }, [i18n.language]);

  const fetchTeamMembers = async () => {
    try {
      const response = await teamAPI.getAll(i18n.language);
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  const getSpecialtyIcon = (title) => {
    if (
      title?.toLowerCase().includes("avukat") ||
      title?.toLowerCase().includes("lawyer")
    ) {
      return <BusinessCenterIcon />;
    }
    if (
      title?.toLowerCase().includes("danışman") ||
      title?.toLowerCase().includes("consultant")
    ) {
      return <SchoolIcon />;
    }
    return <StarIcon />;
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #001f3f 0%, #003366 100%)",
          color: "#fff",
          paddingTop: { xs: 12, md: 20 },
          paddingBottom: { xs: 12, md: 20 },
          marginBottom: { xs: 5, md: 8 },
          position: "relative",
          overflow: "hidden",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
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

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4rem" },
                marginBottom: 3,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fadeInUp 1s ease-out",
                textShadow: "none",
              }}
            >
              {t("team.heroTitle")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.95,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.6,
                fontWeight: 400,
                marginBottom: 4,
                animation: "fadeInUp 1s ease-out 0.2s both",
                color: "#ffffff",
                textShadow:
                  "0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              {t("team.heroText")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
                animation: "fadeInUp 1s ease-out 0.4s both",
              }}
            >
              <Chip
                icon={<BusinessCenterIcon />}
                label={t("team.experienceChip")}
                sx={{
                  backgroundColor: "rgba(198, 40, 40, 0.15)",
                  color: "#c62828",
                  fontWeight: 600,
                  border: "1px solid rgba(198, 40, 40, 0.3)",
                  "& .MuiChip-icon": { color: "#c62828" },
                }}
              />
              <Chip
                icon={<SchoolIcon />}
                label={t("team.expertTeam")}
                sx={{
                  backgroundColor: "rgba(198, 40, 40, 0.15)",
                  color: "#c62828",
                  fontWeight: 600,
                  border: "1px solid rgba(198, 40, 40, 0.3)",
                  "& .MuiChip-icon": { color: "#c62828" },
                }}
              />
              <Chip
                icon={<StarIcon />}
                label={t("team.customerSatisfaction")}
                sx={{
                  backgroundColor: "rgba(198, 40, 40, 0.15)",
                  color: "#c62828",
                  fontWeight: 600,
                  border: "1px solid rgba(198, 40, 40, 0.3)",
                  "& .MuiChip-icon": { color: "#c62828" },
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{ paddingX: { xs: 2, md: 4 }, paddingY: { xs: 6, md: 5 } }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress size={60} sx={{ color: "#c62828" }} />
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            justifyContent="center"
            alignItems="stretch"
          >
            {teamMembers.map((member, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={member._id}
                sx={{ width: 320, maxWidth: 320 }}
              >
                <Card
                  sx={{
                    height: 450,
                    width: 320,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0, 31, 63, 0.08)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    position: "relative",
                    animation: `fadeInUp 0.8s ease-out ${
                      0.1 + idx * 0.1
                    }s both`,
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
                      "& .member-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                  onClick={() =>
                    navigate(`/${i18n.language || "tr"}/ekibimiz/${member._id}`)
                  }
                >
                  {/* Photo Section */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    {member.photo ? (
                      <CardMedia
                        component="img"
                        height="320"
                        image={member.photo}
                        alt={member.name}
                        sx={{
                          objectFit: "cover",
                          transition: "all 0.4s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 320,
                          background: `linear-gradient(135deg, ${
                            ["#001f3f", "#003366", "#004080"][idx % 3]
                          } 0%, ${
                            ["#003366", "#004080", "#005090"][idx % 3]
                          } 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "rgba(198, 40, 40, 0.2)",
                            border: "3px solid rgba(198, 40, 40, 0.3)",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{ color: "#c62828", fontWeight: 700 }}
                          >
                            {member.name?.charAt(0)?.toUpperCase()}
                          </Typography>
                        </Avatar>
                      </Box>
                    )}

                    {/* Hover Overlay */}
                    <Box
                      className="member-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(135deg, rgba(0, 31, 63, 0.9) 0%, rgba(0, 51, 102, 0.9) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          backgroundColor: "#c62828",
                          color: "#ffffff",
                          fontWeight: 700,
                          paddingX: 3,
                          paddingY: 1.5,
                          borderRadius: 3,
                          boxShadow: "0 8px 25px rgba(198, 40, 40, 0.3)",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                            transform: "translateY(-2px)",
                            boxShadow: "0 12px 35px rgba(198, 40, 40, 0.4)",
                          },
                        }}
                      >
                        {t("team.profileView")}
                      </Button>
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      padding: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {/* Name and Title */}
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: "#001f3f",
                          marginBottom: 1,
                          fontSize: "1.4rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginBottom: 2,
                        }}
                      >
                        {getSpecialtyIcon(member.title)}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "#c62828",
                            fontWeight: 700,
                            fontSize: "1rem",
                            letterSpacing: "0.3px",
                          }}
                        >
                          {member.title}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Bio */}
                    {member.bio && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          lineHeight: 1.6,
                          fontSize: "0.95rem",
                          flexGrow: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {member.bio}
                      </Typography>
                    )}

                    {/* Social Links */}
                    {member.socialLinks && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginTop: "auto", paddingTop: 2 }}
                      >
                        {member.socialLinks.email && (
                          <Tooltip title={t("team.emailTooltip")}>
                            <IconButton
                              size="small"
                              href={`mailto:${member.socialLinks.email}`}
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                backgroundColor: "rgba(0, 31, 63, 0.08)",
                                color: "#c62828",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 31, 63, 0.15)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.socialLinks.linkedin && (
                          <Tooltip title={t("team.linkedinTooltip")}>
                            <IconButton
                              size="small"
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                backgroundColor: "rgba(0, 31, 63, 0.08)",
                                color: "#c62828",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 31, 63, 0.15)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <LinkedInIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.socialLinks.phone && (
                          <Tooltip title={t("team.phoneTooltip")}>
                            <IconButton
                              size="small"
                              href={`tel:${member.socialLinks.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              sx={{
                                backgroundColor: "rgba(0, 31, 63, 0.08)",
                                color: "#c62828",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 31, 63, 0.15)",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <PhoneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ paddingX: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #001f3f 0%, #003366 50%, #004080 100%)",
            borderRadius: 4,
            padding: { xs: 6, md: 10 },
            textAlign: "center",
            marginBottom: { xs: 4, md: 6 },
            boxShadow: "0 25px 80px rgba(0, 31, 63, 0.25)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              backgroundColor: "rgba(198, 40, 40, 0.08)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: 3,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                letterSpacing: "-0.01em",
                textShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              {t("team.ctaTitle")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                marginBottom: 5,
                opacity: 0.95,
                fontSize: { xs: "1rem", md: "1.2rem" },
                maxWidth: 600,
                margin: "0 auto 3rem",
                lineHeight: 1.6,
                textShadow:
                  "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {t("team.ctaText")}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(`/${i18n.language || "tr"}/iletisim`)}
                sx={{
                  backgroundColor: "#c62828",
                  color: "#ffffff",
                  fontWeight: 700,
                  paddingX: 5,
                  paddingY: 2,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  boxShadow: "0 8px 25px rgba(198, 40, 40, 0.3)",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 35px rgba(198, 40, 40, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("team.ctaButton")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Team;
