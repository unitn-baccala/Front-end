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
import CustomSnackbar from '../components/CustomSnackBar';
import { useRouter } from 'next/router'

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const submit = (data) => {
        registerUser(data.email, data.password, data.business_name)
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if (res.status == 400 || res.status == 500) {
                    setSeverity("error");
                    setMessage(
                        <React.Fragment>
                            <Typography variant='body1'>La registrazione non è andata a buon fine!</Typography>
                            <Typography variant='body2'>{data.msg}</Typography>
                        </React.Fragment>
                    );
                    setOpen(true);
                }
                else {
                    setSeverity("success");
                    setMessage(
                        <Typography variant='body1'>La registrazione è andata a buon fine!</Typography>
                    );
                    setOpen(true);
                    setTimeout(router.push('/login'), 3000);
                }
        });
    }

    return (
        <React.Fragment>
            <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Paper elevation={3} sx={{ width: "25%", padding: "3%"}}>
                    <Box sx={{ marginBottom: "5%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LockIcon fontSize='large'></LockIcon>
                        <Typography variant='h5'>Registrati</Typography>
                    </Box>
                    <Stack component="form" spacing={2} onSubmit={handleSubmit(submit)}>
                        <TextField
                            error={errors.email}
                            required
                            fullWidth
                            label="Indirizzo email"
                            helperText={errors.email && errors.email.message}
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "campo obbligatorio"
                                },
                                pattern: {
                                    value: /^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/,
                                    message: "email non valida"
                                }
                            })}
                        />
                        <TextField
                            error={errors.password}
                            required
                            fullWidth
                            label="Password"
                            helperText={errors.password && errors.password.message}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "campo obbligatorio"
                                },
                                minLength: {
                                    value: 12,
                                    message: "lunghezza minima 12 caratteri"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "lunghezza massima 64 caratteri"
                                },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])(.{12,64})$/,
                                    message: "la password non rispetta i requisiti"
                                }
                            })}
                        />
                        <TextField
                            error={errors.business_name}
                            required
                            fullWidth
                            label="Nome attività commerciale"
                            helperText={errors.business_name && errors.business_name.message}
                            {...register("business_name", {
                                required: {
                                    value: true,
                                    message: "campo obbligatorio"
                                },
                                minLength: {
                                    value: 1,
                                    message: "lunghezza minima 1 carattere"
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Registrati
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                        >
                            <Link href="/signin" className={styles.link}>Accedi</Link>
                        </Button>
                    </Stack>
                </Paper>
            </Box>
            <CustomSnackbar open={open} handleClose={handleClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    );
}
