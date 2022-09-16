import {
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import { useAuthContext } from "../../shared/contexts";
import { Product } from "../../types/product";


function AdminAddProduct() {
  const { registerProduct } = useAuthContext();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>();


  const handleRegisterProduct = () => {  
    setIsLoading(true);
    console.log(product);
    registerProduct(product as Product)
    .then(() => setIsLoading(false))
  }
  
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null){
      return
    }else{
      setProduct({...product, picture: e.target.files[0].name } as Product)
    }
    
  }
  
  
  return (

    <>
    <PrimarySearchAppBar />
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      style={{ backgroundColor: "#1111" }}
    >
      <Box
        height="80%"
        width="30%"
        alignSelf={"center"}
        display={"flex"}
        borderRadius="2%"
        style={{ backgroundColor: "white" }}
      >
        
          
          <Box
            width="100%"
            display="flex"
            flexDirection={"column"}
            alignSelf={"center"}
            textAlign="center"
            padding={4}
            gap={2}
          >
            <h1>Cadastrar Produto</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>

            <FormControl fullWidth sx={{ gap: 2}}>            
            <TextField
              id="titulo-outlined-basic"
              error={false}
              helperText=""
              label="Título"
              variant="outlined"
              required={true}
              value={product?.title || ''}
              onChange={(e) => setProduct({ ...product, title: e.target.value } as Product)}
            />

            <TextField
              id="outlined-description-static"
              label="Descrição"
              multiline
              rows={4}
              value={product?.description || ''}
              onChange={(e) => setProduct({ ...product, description: e.target.value } as Product)}
            />
            <TextField
              id="quantidade-outlined-basic"
              error={false}
              helperText=""
              type={"number"}
              label="Quantidade"
              autoComplete="current-quantity"
              variant="outlined"
              value={product?.quantity || 0}
              onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) } as Product)}
            />
            <TextField
              id="valor-outlined-input"
              label="Valor"
              type="number"
              autoComplete="current-value"
              value={product?.price || 0}
              onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) } as Product)}
            />
            </FormControl>
            <Button variant="contained" component="label" color="primary">
              {" "}
              Escolha uma imagem
              <input type="file" accept="image/*" onChange={handleUpload} hidden/>
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={handleRegisterProduct}
              disabled={isLoading}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AdminAddProduct;
