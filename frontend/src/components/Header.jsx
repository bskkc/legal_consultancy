import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  alpha,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import GavelIcon from "@mui/icons-material/Gavel";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavLink = ({ to, children, isActive }) => (
  <MuiLink
    component={RouterLink}
    to={to}
    sx={{
      position: "relative",
      color: "#ffffff",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "0.95rem",
      padding: "8px 16px",
      borderRadius: "8px",
      transition: "all 0.2s ease-in-out",
      backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        transform: "translateY(-1px)",
      },
      "&::after": isActive
        ? {
            content: '""',
            position: "absolute",
            bottom: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "20px",
            height: "3px",
            backgroundColor: "#c62828",
            borderRadius: "2px",
          }
        : {},
    }}
  >
    {children}
  </MuiLink>
);

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derive language from URL to ensure immediate sync with routing
  const pathSegments = location.pathname.split("/");
  const urlLang = ["tr", "en", "ru", "ar"].includes(pathSegments[1])
    ? pathSegments[1]
    : null;
  const currentLang = urlLang || i18n.language || "tr";

  const menuItems = [
    { label: t("menu.home"), path: `/${currentLang}` },
    { label: t("menu.aboutUs"), path: `/${currentLang}/hakkimizda` },
    { label: t("menu.articles"), path: `/${currentLang}/makaleler` },
    { label: t("menu.team"), path: `/${currentLang}/ekibimiz` },
    { label: t("menu.contact"), path: `/${currentLang}/iletisim` },
  ];

  const isPathActive = (path) => {
    if (path === `/${currentLang}` && location.pathname === `/${currentLang}`) {
      return true;
    }
    if (path !== `/${currentLang}` && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          'linear-gradient(135deg, rgba(0, 31, 63, 0.98) 0%, rgba(0, 51, 102, 0.98) 100%), url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: "cover",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        paddingY: { xs: 0.5, md: 1 },
        borderRadius: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 } }}>
          <GavelIcon
            sx={{
              marginRight: 1.5,
              fontSize: { xs: 24, md: 28 },
              color: "#c62828",
            }}
          />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "#ffffff",
              fontWeight: 800,
              letterSpacing: 0.5,
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              transition: "all 0.3s",
              "&:hover": {
                color: "#c62828",
              },
            }}
          >
            {t("site.title")}
          </Typography>
          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} isActive={isPathActive(item.path)}>
                {item.label}
              </NavLink>
            ))}
            
            <Box sx={{ ml: 2, pl: 2, borderLeft: '1px solid rgba(255,255,255,0.2)', height: '24px', display: 'flex', alignItems: 'center' }}>
              <LanguageSwitcher />
            </Box>
          </Stack>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <LanguageSwitcher />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{
                ml: 1,
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          sx={{
            width: 250,
            bgcolor: "#001f3f",
            height: "100%",
            color: "white",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/${i18n.language || "tr"}`}
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor:
                  location.pathname === `/${i18n.language || "tr"}`
                    ? "rgba(198, 40, 40, 0.2)"
                    : "transparent",
              }}
            >
              <ListItemText primary={t("menu.home")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/${i18n.language || "tr"}/hakkimizda`}
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor:
                  location.pathname === `/${i18n.language || "tr"}/hakkimizda`
                    ? "rgba(198, 40, 40, 0.2)"
                    : "transparent",
              }}
            >
              <ListItemText primary={t("menu.aboutUs")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/${i18n.language || "tr"}/makaleler`}
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor: location.pathname.startsWith(
                  `/${i18n.language || "tr"}/makaleler`
                )
                  ? "rgba(198, 40, 40, 0.2)"
                  : "transparent",
              }}
            >
              <ListItemText primary={t("menu.articles")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/${i18n.language || "tr"}/ekibimiz`}
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor: location.pathname.startsWith(
                  `/${i18n.language || "tr"}/ekibimiz`
                )
                  ? "rgba(198, 40, 40, 0.2)"
                  : "transparent",
              }}
            >
              <ListItemText primary={t("menu.team")} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to={`/${i18n.language || "tr"}/iletisim`}
              onClick={() => setDrawerOpen(false)}
              sx={{
                bgcolor:
                  location.pathname === `/${i18n.language || "tr"}/iletisim`
                    ? "rgba(198, 40, 40, 0.2)"
                    : "transparent",
              }}
            >
              <ListItemText primary={t("menu.contact")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;
