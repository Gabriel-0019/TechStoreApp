import { Box, Typography } from "@mui/material";
export const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 2,
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography variant="body1">
        © 2025 Este proyecto se ha creado con el fin de poder mostrar la
        experiencia y conocimientos de Gabriel Mora Torres.
      </Typography>
    </Box>
  );
};
