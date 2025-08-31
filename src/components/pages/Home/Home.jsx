import { Typography, Box, Grid, Container } from "@mui/material";
import { ProductCard } from "../../common/ProductCard/ProductCard";

export default function Home() {
  const handleBuy = (productName) => {
    alert(`¡${productName} añadido al carrito!`);
  };

  const products = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/deigdy0bj/image/upload/v1736904931/lenovo-ideapad-slim-3-i3-n305-8-gb-ssd_j4c0vd.jpg",
      title: "Razer Viper V3 Pro - Black",
      description:
        "Ultra-lightweight Symmetrical Wireless Esports Gaming Mouse with HyperPolling 8000 Hz",
      price: "US$159.99",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/deigdy0bj/image/upload/v1736904931/lenovo-ideapad-slim-3-i3-n305-8-gb-ssd_j4c0vd.jpg",
      title: "Razer Viper V3 Pro - Black",
      description:
        "Ultra-lightweight Symmetrical Wireless Esports Gaming Mouse with HyperPolling 8000 Hz",
      price: "US$159.99",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/deigdy0bj/image/upload/v1736904931/lenovo-ideapad-slim-3-i3-n305-8-gb-ssd_j4c0vd.jpg",
      title: "Razer Viper V3 Pro - Black",
      description:
        "Ultra-lightweight Symmetrical Wireless Esports Gaming Mouse with HyperPolling 8000 Hz",
      price: "US$159.99",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/deigdy0bj/image/upload/v1736904931/lenovo-ideapad-slim-3-i3-n305-8-gb-ssd_j4c0vd.jpg",
      title: "Razer Viper V3 Pro - Black",
      description:
        "Ultra-lightweight Symmetrical Wireless Esports Gaming Mouse with HyperPolling 8000 Hz",
      price: "US$159.99",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/deigdy0bj/image/upload/v1736904931/lenovo-ideapad-slim-3-i3-n305-8-gb-ssd_j4c0vd.jpg",
      title: "Razer Viper V3 Pro - Black",
      description:
        "Ultra-lightweight Symmetrical Wireless Esports Gaming Mouse with HyperPolling 8000 Hz",
      price: "US$159.99",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
          }}
        >
          TECH STORE
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid key={product.id}>
              <ProductCard
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                onBuy={() => handleBuy(product.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
