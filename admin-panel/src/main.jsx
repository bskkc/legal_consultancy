import React from "react";
import "./i18n";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";

function Root() {
  const { i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [dir]);

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: dir,
        palette: {
          primary: { main: "#1a237e" }, // Deep Navy Blue
          secondary: { main: "#c5cae9" },
          background: { default: "#f4f6f8" },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h6: { fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none", borderRadius: 8 },
            },
          },
        },
      }),
    [dir]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
