import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
import LockIcon from '@mui/icons-material/Lock';
import styles from '../styles/Link.module.css'
import { useForm } from "react-hook-form";
import { registerUser } from '../lib/api';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function CustomSnackbar(props){
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            onClick={props.handleClick}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return(
        <Snackbar
            open={props.open}
            autoHideDuration={3000}
            onClose={props.handleClick}
            action={action}
        >
            <Alert variant="filled" onClose={props.handleClick} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}