import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getUser } from "../lib/api";
import { readCookie } from "../lib/cookie";
import CustomSnackbar from '../components/CustomSnackBar';

export default function Account() {
    const [user, setUser] = React.useState();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");

    const handleClose = () => {    
        setOpenSnackBar(false);
    };

    React.useEffect(() => {
        getUser(readCookie("token"))
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if (res.status == 200) {
                    setUser(data);
                }
                else {
                    setSeverity("error");
                    setMessage(
                        <React.Fragment>
                            <Typography variant='body1'>Errore API</Typography>
                            <Typography variant='body2'>{data.msg}</Typography>
                        </React.Fragment>
                    );
                    setOpenSnackBar(true);
                }
        });
     }, []);

    return (
        <React.Fragment>
            {
                user ?
                <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Paper elevation={3} sx={{ width: "50%", padding: "3%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant='h1' gutterBottom>Account</Typography>
                        <Stack direction="row" justifyContent="center" alignItems="stretch" spacing={5}>
                            <Avatar sx={{ width: 150, height: 150, bgcolor: "#1976d2" }}>
                                <Typography variant="h1">
                                    {user.business_name.substr(0, 2)}
                                </Typography>
                            </Avatar>
                            <Stack direction="column" justifyContent="space-evenly" alignItems="flex-start" spacing={1}>
                                <Stack direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={1}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }} >Nome attività:</Typography>
                                    <Typography variant='h5'>
                                        {user.business_name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>Indirizzo email:</Typography>
                                    <Typography variant='h5'>
                                        {user.email}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>2FA:</Typography>
                                    <FormGroup>
                                        <FormControlLabel disabled checked control={<Checkbox />} label={
                                            <Typography variant='h5'>
                                                { user.enabled_2fa ? "Attivato" : "Disattivato" }
                                            </Typography>
                                        }
                                    />
                                    </FormGroup>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
                :
                <Box sx={{ width: "90%", margin: "5%" }}>
                    <LinearProgress />
                </Box>
            }
            <CustomSnackbar open={openSnackBar} handleClose={handleClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    )
}