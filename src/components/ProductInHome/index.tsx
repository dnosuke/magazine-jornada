import * as React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { formatMoney } from "../../shared/utils/numbers";
import { Product } from "../../types/product";
import userCartStore from "../../shared/store/userCart";
import { useNavigate } from "react-router-dom";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductInHome(product: Product) {
  const navigate = useNavigate();
  const { cart, addProduct } = userCartStore();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  function handleAddToCart() {
    let item = { item: product, quantity: 1 };
    addProduct(item);

    setOpenSnackbar(true);
  }

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 415, minWidth: 300, minHeight: 415 }}>
      <CardActionArea
        onClick={() => navigate("/product-description", { state: product })}
      >
        <CardMedia
          component="img"
          sx={{ width: 268, maxHeight: 202, m: 2, mt: 4 }}
          image={product.picture}
          alt={product.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            fontSize={14}
            component="div"
            width={260}
            height={44}
          >
            {product.title}
          </Typography>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            color={"#ff6500"}
          >
            {formatMoney(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-around" }}>
        <Button
          style={{ width: "100%", backgroundColor: "#ff6500", color: "white" }}
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon />
          Comprar
        </Button>
      </CardActions>

      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Produto adicionado ao carrinho
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default ProductInHome;
