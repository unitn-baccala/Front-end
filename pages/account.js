import { getUser } from "../lib/api";
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import Link from 'next/link'
import LockIcon from '@mui/icons-material/Lock';
import styles from '../styles/Link.module.css'
import { useForm } from "react-hook-form";
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import GlobalStyles from '@mui/material/GlobalStyles';
import { grey } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pricing from '../components/Pricing';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ChairAltOutlined } from "@mui/icons-material";

export default function Account() {
    const [user, setUser] = React.useState();

    React.useEffect(()=>{
        console.log(document.cookie);
        console.log(document.cookie.split('=')[1]);

        getUser(document.cookie.split('=')[1])
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if (res.status == 400 || res.status == 500) {
                    //error
                }
                else {
                    //success
                    setUser(data);
                    console.log(data);
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
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                                    <Typography variant="h6">Nome attività:</Typography>
                                    <Typography variant='body1' marginLeft={1}>
                                        {user.business_name}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                                    <Typography variant="h6">Indirizzo email:</Typography>
                                    <Typography variant='body1' marginLeft={1}>
                                        {user.email}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0}>
                                    <Typography variant="h6">2FA:</Typography>
                                    <Checkbox disabled checked />
                                    <Typography variant='body1'>
                                        {
                                            user.enabled_2fa ?
                                            "Attivato"
                                            :
                                            "Disattivato"
                                        }
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
                :
                <LinearProgress />
            }
        </React.Fragment>
    )
}