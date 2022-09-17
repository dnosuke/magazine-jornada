import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { formatMoney } from "../../shared/utils/numbers";
import { CartItemType } from "../../shared/store/userCart";

interface ICartItem {
  item: CartItemType,
  handleAdd: (id: number) => void,
  handleRemove: (id: number, quantity: number) => void,
  handleDel: (id: number) => void,
  buttonDisable: boolean,
}

function ItemCart({ item, handleAdd, handleRemove, handleDel, buttonDisable }: ICartItem) {

  return (
    <Card sx={{ display: "flex", padding: 2, mb: 2, justifyContent: 'space-between', backgroundColor: '#1111' }}>
      <CardMedia
        component="img"
        sx={{ width: 155, height: 120 }}
        image={item.item.picture}
        alt={item.item.title}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.item.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            Valor Unitário
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {formatMoney(item.item.price)}
            
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
        <Tooltip title="Remover" onClick={() => handleRemove(item.item.id, item.quantity)}>
          <IconButton>
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
        {item.quantity}
        <Tooltip title="Adicionar" onClick={() => handleAdd(item.item.id)}>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" onClick={() => handleDel(item.item.id)}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        </Box>
      </Box>
      <Box >
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Valor Total
        </Typography>
        <Typography variant="h6" color="text.secondary" component="div">
          {formatMoney(item.item.price * item.quantity)}
        </Typography>
      </Box>
    </Card>
  );
}

export default ItemCart;
