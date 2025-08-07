import { Box, Typography, Button } from "@mui/material";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { useNavigate } from "react-router";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop={"2%"}
      textAlign="center"
    >
      <MoodBadIcon sx={{ fontSize: 80, color: "error.main" }} />
      <Typography variant="h2" fontWeight="bold" mt={2}>
        404
      </Typography>
      <Typography variant="h5" mt={1}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" mt={1} mb={3}>
        La página que buscas no existe.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default Error404;
