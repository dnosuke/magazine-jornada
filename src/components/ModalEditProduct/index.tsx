import {
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

type ModalType = {
  open: boolean;
  handleClose: () => void;
}

export default function ModalEditProduct({open, handleClose}: ModalType) {
  const handleSubmit = () => {

  }

  return (  
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-moun-modal-title" variant="h6" component="h2" sx={{ m: 2, textAlign: 'center'}}>
            Atualizar produto
          </Typography>
          <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ gap: 2}}>            
            <TextField
              id="titulo"
              error={false}
              helperText=""
              label="Título"
              variant="outlined"
              required={true}
              value={'oksao'}
            />

            <TextField
              id="outlined-description-static"
              label="Descrição"
              multiline
              rows={4}
              value={'okadsokda'}
            />
            <TextField
              id="quantidade-outlined-basic"
              error={false}
              helperText=""
              type={"number"}
              label="Quantidade"
              autoComplete="current-quantity"
              variant="outlined"
              value={0}
            />
            <TextField
              id="valor-outlined-input"
              label="Valor"
              type="number"
              autoComplete="current-value"
              value={0}
            />
            </FormControl>
            <Button
              color="info"
              variant="contained"
              onClick={() => console.info('atualizado')}
              disabled={false}
              sx={{ m: 2 }}
            >
              Atualizar
            </Button>
          </form>
        </Box>
      </Modal>
  );
}