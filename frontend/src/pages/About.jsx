import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedIcon from "@mui/icons-material/Verified";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import ScaleIcon from "@mui/icons-material/Scale";
import SecurityIcon from "@mui/icons-material/Security";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function About() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: GavelIcon,
      title: t("about.feature1"),
      desc: t("about.feature1Desc"),
      color: "#001f3f",
    },
    {
      icon: VerifiedIcon,
      title: t("about.feature2"),
      desc: t("about.feature2Desc"),
      color: "#003366",
    },
    {
      icon: PeopleIcon,
      title: t("about.feature3"),
      desc: t("about.feature3Desc"),
      color: "#004080",
    },
    {
      icon: BusinessIcon,
      title: t("about.feature4"),
      desc: t("about.feature4Desc"),
      color: "#001f3f",
    },
    {
      icon: ScaleIcon,
      title: t("about.feature5"),
      desc: t("about.feature5Desc"),
      color: "#003366",
    },
    {
      icon: SecurityIcon,
      title: t("about.feature6"),
      desc: t("about.feature6Desc"),
      color: "#004080",
    },
  ];

  const stats = [
    { number: "500+", label: t("about.stat1") },
    { number: "20+", label: t("about.stat2") },
    { number: "1000+", label: t("about.stat3") },
    { number: "24/7", label: t("about.stat4") },
  ];

  return (
    <Box
      sx={{ background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)" }}
    >
      {/* Header */}
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
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.25rem", md: "3.25rem" },
              marginBottom: 2,
              letterSpacing: "-0.02em",
              textAlign: "center",
              color: "#ffffff",
              textShadow:
                "0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {t("about.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 1.5,
              opacity: 0.95,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.7,
              textAlign: "center",
              color: "#ffffff",
              textShadow:
                "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            {t("about.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingX: { xs: 2, md: 4 } }}>
        {/* Stats Section */}
        <Box>
          {/* Desktop Grid View */}
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }} 
            justifyContent="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {stats.map((stat, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: { xs: 3, md: 4 },
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0, 31, 63, 0.06)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minWidth: 250,
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "#001f3f",
                      marginBottom: 1,
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Mobile Slider View */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              overflowX: 'auto',
              gap: 2,
              pb: 2,
              px: 1,
              mx: -2,
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {stats.map((stat, idx) => (
              <Box
                key={idx}
                sx={{
                  minWidth: '70vw',
                  scrollSnapAlign: 'center',
                  pl: idx === 0 ? 2 : 0,
                  pr: idx === stats.length - 1 ? 2 : 0,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    padding: 4,
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0, 31, 63, 0.06)",
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "#001f3f",
                      marginBottom: 1,
                      fontSize: "2rem",
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mission Section */}
        <Box sx={{ paddingY: { xs: 4, md: 6 } }}>
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    marginBottom: 3,
                    color: "#001f3f",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("about.missionTitle")}
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "#333",
                    marginBottom: 3,
                  }}
                >
                  {t("about.missionText1")}
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "#333",
                  }}
                >
                  {t("about.missionText2")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  padding: { xs: 4, md: 5 },
                  background:
                    "linear-gradient(135deg, #001f3f 0%, #003366 100%)",
                  color: "#fff",
                  borderRadius: 3,
                  boxShadow: "0 12px 40px rgba(0, 31, 63, 0.15)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -80,
                    right: -80,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    backgroundColor: "rgba(198, 40, 40, 0.04)",
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      marginBottom: 3,
                      fontSize: { xs: "1.85rem", md: "2.25rem" },
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      textShadow:
                        "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {t("about.visionTitle")}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      lineHeight: 1.9,
                      opacity: 0.95,
                      fontSize: { xs: "1rem", md: "1.05rem" },
                      marginBottom: 4,
                      color: "#ffffff",
                      textShadow:
                        "0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {t("about.visionText")}
                  </Typography>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderColor: "#ffffff",
                      color: "#ffffff",
                      fontWeight: 600,
                      paddingX: 3.5,
                      paddingY: 1.35,
                      fontSize: "0.95rem",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderColor: "#ffffff",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s",
                    }}
                    onClick={() =>
                      navigate(`/${i18n.language || "tr"}/ekibimiz`)
                    }
                  >
                    {t("about.visionButton")}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ marginBottom: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              textAlign: "center",
              marginBottom: { xs: 5, md: 7 },
              marginTop: { xs: 2, md: 3 },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                marginBottom: 3,
                color: "#001f3f",
                fontSize: { xs: "2rem", md: "2.75rem" },
                letterSpacing: "-0.02em",
              }}
            >
              {t("about.featuresTitle")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                maxWidth: 650,
                margin: "0 auto",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.8,
              }}
            >
              {t("about.featuresSubtitle")}
            </Typography>
          </Box>

          {/* Desktop Grid View */}
          <Grid 
            container 
            spacing={{ xs: 2.5, md: 3 }} 
            justifyContent="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {features.map((feature, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={idx}
                sx={{ width: 320, maxWidth: 320 }}
              >
                <Card
                  sx={{
                    height: 270,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0, 31, 63, 0.06)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
                      borderColor: "rgba(0, 31, 63, 0.12)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      padding: { xs: 3, md: 4 },
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: feature.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 2rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      }}
                    >
                      <feature.icon sx={{ fontSize: 36, color: "#fff" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#001f3f",
                        marginBottom: 2,
                        fontSize: "1.15rem",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
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
                    height: 270,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0, 31, 63, 0.06)",
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      padding: 4,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: feature.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 2rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      }}
                    >
                      <feature.icon sx={{ fontSize: 36, color: "#fff" }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#001f3f",
                        marginBottom: 2,
                        fontSize: "1.15rem",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
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

        {/* CTA Section */}
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
              {t("home.ctaTitle")}
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
                {t("home.ctaButton1")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
