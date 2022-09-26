import { Box, Button, FormControl, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "../../shared/contexts";
import { Product } from "../../types/product";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

type ModalType = {
  open: boolean;
  product: Product;
  update: (product: Product) => Promise<void>;
  handleClose: () => void;
};

type FormData = {
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  picture: string;
};

export default function ModalEditProduct({
  open,
  handleClose,
  product,
  update,
}: ModalType) {
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
    update(data as Product).then(() => {
      setIsLoading(false);
    });
    handleClose();
  });

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-moun-modal-title"
          variant="h6"
          component="h2"
          sx={{ m: 2, textAlign: "center" }}
        >
          Atualizar produto
        </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth sx={{ gap: 2 }}>
            <Controller
              name={"title"}
              control={control}
              defaultValue={product.title}
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
              defaultValue={product.description}
              render={({ field: { value } }) => (
                <TextField
                  error={errors.description ? true : false}
                  helperText={errors.description ? "Preencha este campo" : ""}
                  value={value}
                  label={"Descrição"}
                  multiline
                  rows={4}
                  {...register("description", { required: true })}
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
              value={product.quantity}
              disabled={true}
            />
            <TextField
              id="valor-outlined-input"
              label="Valor"
              type="number"
              autoComplete="current-value"
              value={product.price}
              disabled={true}
            />
            <Button
              color="info"
              variant="contained"
              type="submit"
              disabled={false}
              sx={{ m: 2 }}
              onClick={() => {
                setValue("id", product.id);
                setValue("quantity", product.quantity);
                setValue("price", product.price);
                setValue("picture", product.picture);
              }}
            >
              Atualizar
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}
