import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Container,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { contactAPI } from "../services/api";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!recaptchaToken) {
    //   setError(t("contact.recaptchaError") || "Please complete the reCAPTCHA");
    //   return;
    // }

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.phone
    ) {
      setError(t("contact.validationError") || "Please fill required fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recaptchaToken: recaptchaToken,
      });

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      recaptchaRef.current.reset();
      setRecaptchaToken(null);

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t("contact.submitError") ||
          "An error occurred, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

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
            position: "absolute",
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
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(198,40,40,0.15) 0%, rgba(198,40,40,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(30px)",
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
              color: "#ffffff",
              textShadow:
                "0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {t("menu.contact")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 1.5,
              opacity: 0.95,
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 550,
              lineHeight: 1.7,
              color: "#ffffff",
              textShadow:
                "0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Sorularınız ve taleplerini için bize ulaşın
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingX: { xs: 2, md: 4 } }}>
        {/* Form Section */}
        <Grid
          spacing={{ xs: 3, md: 5 }}
          sx={{
            marginBottom: { xs: 5, md: 8 },
            paddingY: { xs: 4, md: 0 },
          }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#001f3f",
                  marginBottom: 2,
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  letterSpacing: "-0.01em",
                }}
              >
                {t("contact.getInTouch") || "Get in touch"}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  lineHeight: 1.85,
                  fontSize: "1rem",
                }}
              >
                Hukuki danışmanlığa ihtiyacınız olduğunda, deneyimli
                avukatlarımız sizin için hazırız. Aşağıdaki formu doldurarak
                bize ulaşabilirsiniz.
              </Typography>
            </Box>

            {success && (
              <Alert
                severity="success"
                sx={{
                  marginBottom: 3,
                  borderRadius: 2,
                  fontSize: "0.95rem",
                }}
              >
                {t("contact.successMessage") ||
                  "Your message has been sent. We will contact you soon."}
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 3,
                  borderRadius: 2,
                  fontSize: "0.95rem",
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={t("contact.name")}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 31, 63, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#c62828",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c62828",
                      },
                    },
                    "& input": {
                      border: "none",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={t("contact.email")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 31, 63, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#c62828",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c62828",
                      },
                    },
                    "& input": {
                      border: "none",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={t("contact.phone")}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  size="medium"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 31, 63, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#c62828",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c62828",
                      },
                    },
                    "& input": {
                      border: "none",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label={t("contact.message")}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 31, 63, 0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#c62828",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c62828",
                      },
                    },
                    "& textarea": {
                      border: "none",
                    },
                  }}
                />

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={handleRecaptchaChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading} // || !recaptchaToken}
                  endIcon={
                    loading ? <CircularProgress size={20} /> : <SendIcon />
                  }
                  sx={{
                    backgroundColor: "#c62828",
                    fontWeight: 600,
                    paddingY: 1.5,
                    fontSize: "1.05rem",
                    boxShadow: "0 4px 12px rgba(198, 40, 40, 0.15)",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      boxShadow: "0 8px 20px rgba(11, 39, 64, 0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {loading ? "Gönderiliyor..." : t("buttons.submit")}
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>

        {/* Contact Info Cards */}
        <Grid
          container
          spacing={{ xs: 2.5, md: 3 }}
          justifyContent={{ md: "space-between" }}
          sx={{
            marginBottom: { xs: 5, md: 8 },
          }}
        >
          {[
            {
              icon: PhoneIcon,
              label: "contact.phone",
              value: "+90 (XXX) XXX XX XX",
            },
            {
              icon: EmailIcon,
              label: "contact.email",
              value: "info@example.com",
            },
            {
              icon: LocationOnIcon,
              label: "contact.address",
              value: "İstanbul, Türkiye",
            },
            {
              icon: AccessTimeIcon,
              label: "contact.hours",
              value: "09:00 - 18:00",
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  width: 200,
                  textAlign: "center",
                  padding: { xs: 2.5, md: 3 },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(0, 31, 63, 0.06)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <item.icon
                  sx={{ fontSize: 48, color: "#c62828", marginBottom: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    marginBottom: 1.25,
                    color: "#001f3f",
                    fontSize: "1.05rem",
                  }}
                >
                  {t(item.label) || item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.95rem",
                    color: "textSecondary",
                    lineHeight: 1.6,
                  }}
                >
                  {item.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Map Section */}
        <Box sx={{ marginBottom: { xs: 5, md: 8 }, position: "relative" }}>
          <Paper
            sx={{
              height: { xs: 300, md: 500 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 31, 63, 0.15)",
              position: "relative",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              <MapContainer
                center={[39.9334, 32.8597]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                attributionControl={false}
              >
                <TileLayer
                  attribution=""
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[39.9334, 32.8597]}>
                  <Popup>Ankara, Türkiye</Popup>
                </Marker>
              </MapContainer>
            </div>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
