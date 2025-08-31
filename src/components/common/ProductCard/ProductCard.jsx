import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Card,
  Box,
  Button,
} from "@mui/material";
import "./ProductCard.css";

export const ProductCard = ({ image, title, description, price, onBuy }) => {
  return (
    <>
      <Card className="styled-card">
        <Box className="image-container">
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              maxHeight: 240,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </Box>

        <CardContent sx={{ padding: "1.5rem" }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: "white",
              fontWeight: 600,
              marginBottom: "0.75rem",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: "1.5rem",
              lineHeight: 1.5,
              color: "#b0b0b0",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            padding: "0 1.5rem 1.5rem 1.5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {price}
          </Typography>

          <Button className="buy-button" variant="contained" onClick={onBuy}>
            Ver detalle
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
