import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Link,
  Grid,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import Alert from "@mui/material/Alert";

function Login() {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Los valores de correo y contraseña son obligatorios.");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Correo electrónico*"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña*"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && (
              <>
                <Alert severity="error">{error}</Alert>
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              Iniciar Sesión
            </Button>

            <Grid container spacing={2}>
              <Grid>
                <Link variant="body2" onClick={() => navigate("/register")}>
                  ¿No tienes cuenta? Regístrate
                </Link>
              </Grid>
              <Grid textAlign="right">
                <Link
                  variant="body2"
                  onClick={() => navigate("/forgotpassword")}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
