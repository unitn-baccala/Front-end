import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function AddMenu(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submit = () => {

    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
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
                        required
                        fullWidth
                        label="Alarm clock"
                        type="time"
                        defaultValue="12:00"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        <Typography variant="button" color="white">Invia</Typography>
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={props.handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}

/*
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
    id="time"
    label="Alarm clock"
    type="time"
    defaultValue="07:30"
    InputLabelProps={{
    shrink: true,
    }}
    inputProps={{
    step: 300, // 5 min
    }}
    sx={{ width: 150 }}
/>
<Button
    type="submit"
    fullWidth
    variant="contained"
>
    <Typography variant="button" color="white">Accedi</Typography>
</Button>
<Button
    fullWidth
    variant="contained"
    onClick={() => {router.push("/signup")}}
>
    <Typography variant="button" color="white">Registrati</Typography>
</Button>
*/