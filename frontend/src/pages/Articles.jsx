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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { categoryAPI } from "../services/api";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GavelIcon from "@mui/icons-material/Gavel";
import BusinessIcon from "@mui/icons-material/Business";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";

function Articles() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    fetchCategories();
  }, [i18n.language]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll({ lang: i18n.language });
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const categoryIcons = [
    GavelIcon,
    BusinessIcon,
    FamilyRestroomIcon,
    AccountBalanceIcon,
    WorkIcon,
    SchoolIcon,
    MedicalServicesIcon,
    SecurityIcon,
    DescriptionIcon,
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
            {t("menu.articles")}
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
            {t("articles.subtitle")}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ maxWidth: "1800px", margin: "0 auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 4, md: 3 }}
            justifyContent="center"
            sx={{ paddingY: { xs: 1, md: 5 }, paddingX: { xs: 2, md: 4 } }}
          >
            {categories.map((category, idx) => (
              <Grid item xs={12} sm={6} md={4} key={category._id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    height: 310,
                    width: 280,
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: "5px solid #001f3f",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 48px rgba(0,0,0,0.16)",
                    },
                  }}
                  onClick={() =>
                    navigate(
                      `/${i18n.language || "tr"}/makaleler/${category.slug}`
                    )
                  }
                >
                  <CardMedia
                    sx={{
                      height: 150,
                      background: `linear-gradient(135deg, ${
                        ["#003366", "#004080", "#0059b3"][idx % 3]
                      } 0%, ${
                        ["#004080", "#0059b3", "#0066cc"][idx % 3]
                      } 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        top: -50,
                        right: -50,
                      }}
                    />
                    <Box sx={{ textAlign: "center", zIndex: 1 }}>
                      {React.createElement(
                        categoryIcons[idx % categoryIcons.length],
                        {
                          sx: { fontSize: 48, color: "white", marginBottom: 1 },
                        }
                      )}
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#fff",
                          textAlign: "center",
                          fontWeight: 700,
                          paddingX: 3,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {(category.translations &&
                          category.translations[i18n.language] &&
                          category.translations[i18n.language].name) ||
                          category.name}
                      </Typography>
                    </Box>
                  </CardMedia>
                  <CardContent
                    sx={{
                      height: 120,
                      padding: { xs: 2.5, md: 3.5 },
                      overflow: "hidden",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#001f3f",
                        marginBottom: 1.5,
                        fontSize: "1.15rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {(category.translations &&
                        category.translations[i18n.language] &&
                        category.translations[i18n.language].name) ||
                        category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {t("menu.articles")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ paddingX: { xs: 2, md: 4 }, paddingY: { xs: 1, md: 3 } }}>
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

export default Articles;
