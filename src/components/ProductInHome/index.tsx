import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatMoney } from "../../shared/utils/numbers";
import { Product } from "../../types/product";


function ProductInHome(product: Product) {
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 436 }}>
      <CardActionArea>
        restam {product.quantity} unidades
        <CardMedia
          component="img"
          sx={{ width: 'auto', height: 202, m: 2 }}
          image={product.picture}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5" color={"#ff6500"} >{formatMoney(product.price)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-around" }}>
        <Button style={{ width:'100%',backgroundColor: "#ff6500", color: "white"  }}>
        <ShoppingCartIcon />
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductInHome;
