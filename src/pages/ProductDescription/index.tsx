import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import userCartStore from "../../shared/store/userCart";
import { formatMoney } from "../../shared/utils/numbers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../../types/product";

function ProductDescription() {
  const { state } = useLocation();
  const [product, setProduct] = useState<Product>(state as Product);
  const { addProduct } = userCartStore();

  function handleAddToCart() {
    let item = { item: product, quantity: 1 };
    addProduct(item);
  }

  return (
    <>
      <PrimarySearchAppBar />
        <Typography variant="h5" component="div">
          Descrição de Produto
        </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center', flexWrap: 'wrap' }}>
        <Box sx={{
              maxWidth: '50%',
              m: 2,
            }} >
          <CardMedia
            component="img"
            sx={{
              maxWidth: 500,
              maxHeigth: 400,
              m: 2,
            }}
            image={product.picture}
            alt={product.title}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            Vendido e entregue por: NOME
          </Typography>
          <Typography gutterBottom variant="h4" component="div" maxWidth={500}>
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="p"
            maxWidth={500}
          >
            {product.description}
          </Typography>
          <Typography gutterBottom variant="h6" component="span">
            restam {product.quantity} unidades
          </Typography>
          <CardContent sx={{ mt: 14 }}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              color={"#ff6500"}
            >
              {formatMoney(product.price)}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "space-around" }}>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#ff6500",
                color: "white",
              }}
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon />
              Comprar
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </>
  );
}

export default ProductDescription;
