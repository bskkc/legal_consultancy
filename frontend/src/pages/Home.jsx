import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { categoryAPI } from "../services/api";
import { useTranslation } from "react-i18next";
import icons from "../icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import SecurityIcon from "@mui/icons-material/Security";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const IconLoader = ({ iconName, sx }) => {
    const Icon = icons[iconName];
    if (!Icon) return null;
    return <Icon sx={{ mr: 1, fontSize: '1.5rem', ...sx }} />;
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll({
        limit: 6,
        lang: i18n.language,
      });
      setCategories(response.data.slice(0, 6)); // Show 6 categories on home page
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [i18n.language]);

  const features = [
    {
      icon: GavelIcon,
      title: t("home.feature1"),
      desc: t("home.feature1Desc"),
      color: "#001f3f",
    },
    {
      icon: VerifiedIcon,
      title: t("home.feature2"),
      desc: t("home.feature2Desc"),
      color: "#003366",
    },
    {
      icon: SecurityIcon,
      title: t("home.feature3"),
      desc: t("home.feature3Desc"),
      color: "#004080",
    },
    {
      icon: BusinessIcon,
      title: t("home.feature4"),
      desc: t("home.feature4Desc"),
      color: "#001f3f",
    },
    {
      icon: SchoolIcon,
      title: t("home.feature5"),
      desc: t("home.feature5Desc"),
      color: "#003366",
    },
    {
      icon: StarIcon,
      title: t("home.feature6"),
      desc: t("home.feature6Desc"),
      color: "#004080",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, rgba(0, 31, 63, 0.98) 0%, rgba(0, 51, 102, 0.98) 100%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          color: "#ffffff",
          paddingTop: { xs: 12, md: 20 },
          paddingBottom: { xs: 12, md: 20 },
          position: "relative",
          overflow: "hidden",
          width: "100%",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, paddingX: { xs: 2, md: 4 } }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 900, mx: "auto" }}>
            <Chip
              label={t("home.experienceChip")}
              sx={{
                backgroundColor: "rgba(198, 40, 40, 0.2)",
                color: "#ffcdd2",
                fontWeight: 700,
                fontSize: "0.95rem",
                paddingX: 2,
                paddingY: 2.5,
                marginBottom: 4,
                border: "1px solid rgba(198, 40, 40, 0.4)",
                backdropFilter: "blur(10px)",
                animation: "fadeInUp 1s ease-out",
                borderRadius: "50px",
              }}
            />
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.8rem", md: "5rem" },
                marginBottom: 3,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#ffffff",
                textShadow: "0 10px 30px rgba(0,0,0,0.3)",
                animation: "fadeInUp 1s ease-out 0.2s both",
              }}
            >
              {t("home.heroFullTitle")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                lineHeight: 1.6,
                fontWeight: 400,
                marginBottom: 6,
                maxWidth: 750,
                mx: "auto",
                animation: "fadeInUp 1s ease-out 0.4s both",
                color: "#e0e0e0",
              }}
            >
              {t("home.heroFullSubtitle")}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
              sx={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(`/${i18n.language || "tr"}/hakkimizda`)}
                sx={{
                  backgroundColor: "#c62828",
                  color: "#ffffff",
                  fontWeight: 700,
                  paddingX: 5,
                  paddingY: 2,
                  fontSize: "1.1rem",
                  borderRadius: "50px",
                  boxShadow: "0 10px 30px rgba(198, 40, 40, 0.4)",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 40px rgba(198, 40, 40, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("home.heroButton1")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(`/${i18n.language || "tr"}/iletisim`)}
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#ffffff",
                  fontWeight: 700,
                  paddingX: 5,
                  paddingY: 2,
                  fontSize: "1.1rem",
                  borderRadius: "50px",
                  borderWidth: 2,
                  backdropFilter: "blur(5px)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#ffffff",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("home.heroButton2")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ marginTop: -8, position: "relative", zIndex: 2, marginBottom: 10 }}>
        <Paper
          elevation={0}
          sx={{
            padding: { xs: 4, md: 6 },
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0, 31, 63, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {[
              { number: "25+", label: t("stats.years") || "Yıllık Deneyim" },
              { number: "500+", label: t("stats.cases") || "Başarılı Dava" },
              { number: "50+", label: t("stats.team") || "Uzman Avukat" },
              { number: "98%", label: t("stats.success") || "Müvekkil Memnuniyeti" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "#c62828",
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    marginBottom: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#001f3f",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      <Box sx={{ paddingX: { xs: 2, md: 4 } }}>
        {/* Features Section */}
        <Box sx={{ marginBottom: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: "center", marginBottom: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#001f3f",
                fontSize: { xs: "2.2rem", md: "3rem" },
                letterSpacing: "-0.02em",
                marginBottom: 3,
              }}
            >
              {t("home.whyChooseUs")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                maxWidth: 700,
                margin: "0 auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
              }}
            >
              {t("home.whyChooseUsText")}
            </Typography>
          </Box>

          {/* Desktop Grid View */}
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            alignItems="stretch"
            justifyContent="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 200,
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0, 31, 63, 0.05)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `fadeInUp 0.8s ease-out ${
                      0.1 + idx * 0.1
                    }s both`,
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 50px rgba(0, 31, 63, 0.1)",
                      borderColor: "rgba(198, 40, 40, 0.2)",
                      "& .feature-icon-box": {
                        backgroundColor: "#c62828",
                        color: "#ffffff",
                        transform: "scale(1.1) rotate(5deg)",
                      },
                      "& .feature-icon": {
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      padding: { xs: 4, md: 5 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                      <Box
                        className="feature-icon-box"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "16px",
                          backgroundColor: `${feature.color}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 3,
                          transition: "all 0.4s ease",
                        }}
                      >
                        <feature.icon
                          className="feature-icon"
                          sx={{ fontSize: 32, color: feature.color, transition: "all 0.4s ease" }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#001f3f",
                          fontSize: "1.25rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: 1.7,
                        fontSize: "1rem",
                        flexGrow: 1,
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Mobile Slider View */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              overflowX: 'auto',
              gap: 2,
              pb: 4,
              px: 2,
              mx: -2,
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {features.map((feature, idx) => (
              <Box
                key={idx}
                sx={{
                  minWidth: '85vw',
                  scrollSnapAlign: 'center',
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    minHeight: 200,
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0, 31, 63, 0.05)",
                  }}
                >
                  <CardContent
                    sx={{
                      padding: 4,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "16px",
                          backgroundColor: `${feature.color}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 3,
                        }}
                      >
                        <feature.icon
                          sx={{ fontSize: 32, color: feature.color }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#001f3f",
                          fontSize: "1.25rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: 1.7,
                        fontSize: "1rem",
                        flexGrow: 1,
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Services Section */}
        <Box sx={{ marginBottom: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: "center", marginBottom: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#001f3f",
                fontSize: { xs: "2.2rem", md: "3rem" },
                letterSpacing: "-0.02em",
                marginBottom: 3,
              }}
            >
              {t("home.servicesTitle")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                maxWidth: 700,
                margin: "0 auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                marginBottom: 4,
              }}
            >
              {t("home.servicesSubtitle")}
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 8 }}>
              <CircularProgress size={60} sx={{ color: "#001f3f" }} />
            </Box>
          ) : (
            <>
              <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch" justifyContent="center">
                {categories.slice(0, 6).map((category, idx) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={category._id}>
                    <Card
                      sx={{
                        height: "100%",
                        minHeight: 400,
                        cursor: "pointer",
                        borderRadius: 4,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        border: "1px solid rgba(0, 31, 63, 0.05)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        flexDirection: "column",
                        animation: `fadeInUp 0.8s ease-out ${
                          0.1 + idx * 0.1
                        }s both`,
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
                          "& .service-img-overlay": {
                            opacity: 0.2,
                          },
                          "& .service-icon": {
                            transform: "scale(1.1)",
                          },
                          "& .read-more-btn": {
                            backgroundColor: "#c62828",
                            color: "#ffffff",
                            borderColor: "#c62828",
                          }
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/${i18n.language || "tr"}/makaleler/${category.slug}`
                        )
                      }
                    >
                      <Box sx={{ position: "relative", height: 180, overflow: "hidden" }}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${
                              ["#001f3f", "#003366", "#004080"][idx % 3]
                            } 0%, ${
                              ["#003366", "#004080", "#0059b3"][idx % 3]
                            } 100%)`,
                            zIndex: 1,
                          }}
                        />
                        <Box
                          className="service-img-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            opacity: 0.1,
                            zIndex: 2,
                            transition: "opacity 0.4s ease",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            padding: 2,
                          }}
                        >
                          <Box 
                            className="service-icon"
                            sx={{ 
                              marginBottom: 2, 
                              transition: "transform 0.4s ease",
                              backgroundColor: "rgba(255,255,255,0.15)",
                              borderRadius: "50%",
                              padding: 1.5,
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <IconLoader iconName={category.icon} sx={{ color: "#fff", fontSize: "2rem", margin: 0 }} />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              color: "#fff",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: "1.25rem",
                              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            }}
                          >
                            {category.name}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <CardContent
                        sx={{
                          padding: { xs: 3, md: 4 },
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#555",
                              lineHeight: 1.7,
                              fontSize: "1rem",
                              marginBottom: 3,
                            }}
                          >
                            {t("home.categoryDesc")}
                          </Typography>
                        </Box>
                        <Button
                          className="read-more-btn"
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          fullWidth
                          sx={{
                            borderColor: "#001f3f",
                            color: "#001f3f",
                            fontWeight: 700,
                            paddingY: 1.2,
                            borderRadius: 2,
                            borderWidth: 2,
                            "&:hover": {
                              backgroundColor: "#c62828",
                              color: "#ffffff",
                              borderColor: "#c62828",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {t("buttons.readMore")}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* View All Categories Button */}
              <Box sx={{ textAlign: "center", marginTop: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() =>
                    navigate(`/${i18n.language || "tr"}/makaleler`)
                  }
                  sx={{
                    backgroundColor: "#003366",
                    fontWeight: 700,
                    paddingX: 5,
                    paddingY: 2,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    boxShadow: "0 8px 25px rgba(0, 51, 102, 0.3)",
                    "&:hover": {
                      backgroundColor: "#004080",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 35px rgba(0, 51, 102, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {t("home.viewAllCategories")}
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* Enhanced CTA Section */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #001f3f 0%, #003366 50%, #001f3f 100%)",
            borderRadius: 6,
            padding: { xs: 8, md: 12 },
            textAlign: "center",
            marginBottom: { xs: 4, md: 6 },
            boxShadow: "0 30px 90px rgba(0, 31, 63, 0.3)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -150,
              right: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(198, 40, 40, 0.15) 0%, transparent 70%)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 800, mx: "auto" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: 3,
                fontSize: { xs: "2rem", md: "3.5rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                textShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              {t("home.ctaTitle")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#e0e0e0",
                marginBottom: 6,
                opacity: 0.9,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              {t("home.ctaSubtitle")}
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
                  paddingX: 6,
                  paddingY: 2.2,
                  fontSize: "1.15rem",
                  borderRadius: "50px",
                  boxShadow: "0 10px 30px rgba(198, 40, 40, 0.4)",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 40px rgba(198, 40, 40, 0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("home.ctaButton1")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(`/${i18n.language || "tr"}/ekibimiz`)}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#ffffff",
                  fontWeight: 700,
                  paddingX: 6,
                  paddingY: 2.2,
                  fontSize: "1.15rem",
                  borderRadius: "50px",
                  borderWidth: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#ffffff",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {t("home.ctaButton2")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
