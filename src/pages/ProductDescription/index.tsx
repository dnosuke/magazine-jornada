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
    console.log("produto adicionado ao carrinho.");
  }
  console.log(state);

  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" component="div">
          Descrição de Produto
        </Typography>
        <Box sx={{ maxWidth: '80%', alignSelf: "center" }}>
          <Card sx={{}}>
            <CardContent sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: "auto", height: 500, m: 2 }}
                image={product.picture}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {product.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="p">
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default ProductDescription;
