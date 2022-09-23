import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import ItemCart from "../ItemCart";
import { formatMoney } from "../../shared/utils/numbers";
import userCartStore from "../../shared/store/userCart";

type Empty = {
  isEmpty: boolean;
}

export default function ProductInCart({ isEmpty }: Empty) {
  const {cart, remove, increase, decrease, removeAll } = userCartStore();
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);

  function handleIncreaseItemInCart(id: number) {
    increase(id);
    setButtonDisable(false); 
}

function handleDecreaseItemInCart(id: number, quantity: number) {
  quantity === 1 ? setButtonDisable(true) : decrease(id);
}

function handleRemoveProduct(id: number) {
  remove(id);
}

function handleRemoveAllProducts() {
  removeAll();
  isEmpty = true;
}

function handleTotalPrice() {
  let total = 0;
  cart.map((item) => {
    total = total + item.quantity * item.item.price;
    return 1;
  });

  return total;
}

  return (
    <Box sx={{ width: "100%" }} display="flex" flexWrap={"wrap"} justifyContent='center'>
      <Box sx={{ width: "60%" }}>
      {cart.map((item, index) => 
          <ItemCart 
          key={index}
          item={item} 
          handleAdd={handleIncreaseItemInCart} 
          handleRemove={handleDecreaseItemInCart}
          handleDel={handleRemoveProduct}
          buttonDisable={buttonDisable}
          />)}
      </Box>

      <Box>
        <Card sx={{width: 400, minWidth: 275, backgroundColor: '#1111', ml: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total:  {formatMoney(handleTotalPrice())}
            </Typography>
          </CardContent>
          <CardActions>
            <Button style={{ backgroundColor: '#1976d2', color: '#f0eaea' }} size="large">EFETUAR PEDIDO</Button>
            <Button color="error" size="small" onClick={handleRemoveAllProducts}>LIMPAR CARRINHO</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
