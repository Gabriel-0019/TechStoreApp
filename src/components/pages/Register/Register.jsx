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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí iría la lógica para registrar el usuario (por ejemplo, API)
    console.log("Datos de registro:", formData);

    // Simula navegación después del registro
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
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Nombre completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;