import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function PositionedSnackbar({state, close}: any) {

  React.useEffect(()=> {

  },[])


  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={close}
        autoHideDuration={6000}
>
        <Alert onClose={close} severity={state.severity} sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
