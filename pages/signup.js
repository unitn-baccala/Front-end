import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import { useForm } from "react-hook-form";
import { registerUser } from '../lib/api';
import CustomSnackbar from '../components/CustomSnackBar';
import { useRouter } from 'next/router'

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");

    const handleClose = () => {   
        setOpen(false);
    };

    const submit = (data) => {
        registerUser(data.email, data.password, data.business_name)
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if (res.status == 201) {
                    setSeverity("success");
                    setMessage(
                        <Typography variant='body1'>La registrazione è andata a buon fine!</Typography>
                    );
                    setOpen(true);
                    setTimeout(router.push('/signin'), 3000);
                }
                else {
                    setSeverity("error");
                    setMessage(
                        <React.Fragment>
                            <Typography variant='body1'>La registrazione non è andata a buon fine!</Typography>
                            <Typography variant='body2'>{data.msg}</Typography>
                        </React.Fragment>
                    );
                    setOpen(true);
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
                                    value: (/^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/),
                                    message: "email non valida"
                                }
                            })}
                        />
                        <TextField
                            error={errors.password}
                            required
                            fullWidth
                            label="Password"
                            type="password"
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
                                    value: (/^(?=.*[a-zA-Z])(.{12,64})$/),
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
                            <Typography variant="button" color="white">Registrati</Typography>
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {router.push("/signin")}}
                        >
                            <Typography variant="button" color="white">Accedi</Typography>
                        </Button>
                    </Stack>
                </Paper>
            </Box>
            <CustomSnackbar open={open} handleClose={handleClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    );
}
