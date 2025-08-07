import { useState } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí va la lógica para enviar el email (con tu API o backend)
    console.log("Recuperar contraseña para:", email);

    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box width="100%" mb={2} display="flex" alignItems="center">
            <IconButton onClick={() => navigate("/")} aria-label="Regresar">
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Ingresa tu correo electrónico para recibir un enlace de recuperación.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar enlace
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;