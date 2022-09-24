import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PrimarySearchAppBar from "../../components/PrimaryNavbar";
import { useAuthContext } from "../../shared/contexts";
import { Product } from "../../types/product";

type FormData = {
  title: string;
  description: string;
  quantity: number;
  price: number;
  picture: string;
};

function AdminAddProduct() {
  const { registerProduct } = useAuthContext();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    //setIsLoading(true);
    registerProduct(data as Product).then(() => setIsLoading(false));
  });

  const handleRegisterProduct = () => {
    console.log(product);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    } else {
      setProduct({ ...product, picture: e.target.files[0].name } as Product);
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
      >
        <Box
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
            <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
            Cadastrar Produto
          </Typography>
            <span>Lorem ipsum dolor sit amet, consectetur adipisci elit</span>
            <form onSubmit={onSubmit}>
              <FormControl fullWidth sx={{ gap: 2 }}>
                <Controller
                  name={"title"}
                  control={control}
                  render={({ field: { value } }) => (
                    <TextField
                      error={errors.title ? true : false}
                      helperText={errors.title ? "Preencha este campo" : ""}
                      value={value}
                      label={"Titulo"}
                      {...register("title", { required: true })}
                    />
                  )}
                />
                <Controller
                  name={"description"}
                  control={control}
                  render={({ field: { value } }) => (
                    <TextField
                      error={errors.description ? true : false}
                      helperText={
                        errors.description ? "Preencha este campo" : ""
                      }
                      value={value}
                      label={"Descrição"}
                      multiline
                      rows={4}
                      {...register("description", { required: true })}
                    />
                  )}
                />
                <Controller
                  name={"picture"}
                  control={control}
                  render={({ field: { value } }) => (
                    <TextField
                      error={errors.picture ? true : false}
                      helperText={
                        errors.picture ? "Preencha este campo" : ""
                      }
                      value={value}
                      label={"Foto"}
                      {...register("picture", { required: true })}
                    />
                  )}
                />

                <TextField
                  id="quantidade-outlined-basic"
                  error={false}
                  helperText=""
                  type={"number"}
                  label="Quantidade"
                  autoComplete="current-quantity"
                  variant="outlined"
                  value={product?.quantity || 1}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      quantity: parseInt(e.target.value),
                    } as Product)
                  }
                />
                <TextField
                  id="valor-outlined-input"
                  label="Valor"
                  type="number"
                  autoComplete="current-value"
                  value={product?.price || 0.0}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: parseFloat(e.target.value),
                    } as Product)
                  }
                />
                <Button variant="contained" component="label" color="primary">
                  {" "}
                  Escolha uma imagem
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    hidden
                  />
                </Button>
                <Button
                  color="info"
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  onClick={() => {
                    setValue("quantity", product?.quantity || 1);
                    setValue("price", product?.price || 0.0);
                    //setValue("picture", 'https://'+ product?.picture || 'img.png');
                  }}
                >
                  Cadastrar
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AdminAddProduct;
