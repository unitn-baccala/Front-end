import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function CustomSnackbar(props){
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            onClick={props.handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return(
        <Snackbar
            open={props.open}
            autoHideDuration={3000}
            onClose={props.handleClose}
            action={action}
        >
            <Alert variant="filled" onClose={props.handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}