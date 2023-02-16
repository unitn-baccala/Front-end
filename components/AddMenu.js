import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createMenu } from '../lib/api';
import { readCookie } from '../lib/cookie';
import CustomSnackbar from './CustomSnackBar';

const convertTime = (time) => {
    const times = time.split(":");
    return times[0] * 60 + times[1] * 1;
}

export default function AddMenu(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");

    const handleSnackbarClose = () => {    
        setOpenSnackBar(false);
    };

    const submit = (inputs) => {
        createMenu(readCookie("token"), inputs.name, [], convertTime(inputs.start_time), convertTime(inputs.end_time))
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if(res.status == 201) {
                    
                    const newRow = {_id: data.id, name: inputs.name, dishes: [], start_time: inputs.start_time, end_time: inputs.end_time}
                    props.setRows(props.rows.concat(newRow));

                    props.handleChange("menu")
                    props.handleClose();
                } else {
                    setSeverity("error");
                    setMessage(
                        <React.Fragment>
                            <Typography variant='body1'>Errore API</Typography>
                            <Typography variant='body2'>{data.msg}</Typography>
                        </React.Fragment>
                    );
                    setOpenSnackBar(true);
                }
        })
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Aggiungi menu</DialogTitle>
            <DialogContent>
                <Stack component="form" spacing={2} onSubmit={handleSubmit(submit)} sx={{ marginTop: "5%" }}>
                    <TextField
                        error={errors.name}
                        required
                        fullWidth
                        label="Nome"
                        helperText={errors.name && errors.name.message}
                        {...register("name", {
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
                    <TextField
                        error={errors.start_time}
                        required
                        fullWidth
                        label="Orario di inizio"
                        type="time"
                        defaultValue="12:00"
                        helperText={errors.start_time && errors.start_time.message}
                        {...register("start_time", {
                            required: {
                                value: true,
                                message: "campo obbligatorio"
                            }
                        })}
                    />
                    <TextField
                        error={errors.end_time}
                        required
                        fullWidth
                        label="Orario di fine"
                        type="time"
                        defaultValue="15:00"
                        helperText={errors.end_time && errors.end_time.message}
                        {...register("end_time", {
                            required: {
                                value: true,
                                message: "campo obbligatorio"
                            }
                        })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        <Typography variant="button" color="white">Invia</Typography>
                    </Button>
                    <Button fullWidth onClick={props.handleClose}>Cancel</Button>
                </Stack>
            </DialogContent>
            <CustomSnackbar open={openSnackBar} handleClose={handleSnackbarClose} severity={severity} message={message}></CustomSnackbar>
        </Dialog>
    );
}