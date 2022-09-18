import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import ProductInCart from "../../components/ProductInCart";
import userCartStore from "../../shared/store/userCart";

function Cart() {
  const navigate = useNavigate();
  const { cart } = userCartStore();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    handleIsEmpty();
  }, [cart]);

  const handleIsEmpty = () => {
    let quantity = 0;
    cart.map((item) => (quantity += item.quantity));

    if (quantity === 0) {
      setIsEmpty(true);
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <h1>Carrinho</h1>
      <Box height="100vh" display="flex" justifyContent="center">
        {!isEmpty && <ProductInCart isEmpty={isEmpty} />}

        {isEmpty && (
          <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", gap: 2 }}>
            <Typography fontSize={30}>O seu carrinho está vazio</Typography>
            <Button
              color="info"
              variant="contained"
              onClick={() => navigate("/home", { state: "" })}
              sx={{  }}
            >
              Continuar Comprando
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Cart;
