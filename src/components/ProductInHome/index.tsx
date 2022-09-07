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

function ProductInHome() {
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 436 }}>
      <CardActionArea>
        restam {23} unidades
        <CardMedia
          component="img"
          sx={{ width: 'auto', height: 202, m: 2 }}
          image="https://a-static.mlcdn.com.br/800x560/notebook-samsung-book-intel-core-i3-4gb-256gb-ssd-156-full-hd-windows-11-np550xda-kv3br/magazineluiza/233394100/a8dcd2d4e938a2b9886dd586531c92a8.jpg"
          alt="notebook"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Notebook Samsung Book Intel Celeron 4GB 500GB
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="h5" color={"#ff6500"} >{formatMoney(2519.1)}</Typography>
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
