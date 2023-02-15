import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Typography } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackBar';
import { useRouter } from 'next/router'
import PreviewIcon from '@mui/icons-material/Preview';
import { getUser } from "../lib/api";
import { readCookie } from '../lib/cookie';

export default function AdminDrawer(props) {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
    const [businessName, setBusinessName] = React.useState();
    const router = useRouter()

    React.useEffect(() => {
        getUser(readCookie("token"))
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if (res.status == 200) {
                    setBusinessName(data.business_name)
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
    }, [])

    const handleQrClick = () => {
        setSeverity("warning");
        setMessage(
            <Typography variant='body1'>Questa feature non è ancora implementata</Typography>
        );
    
        setOpenSnackBar(true);
    };

    const handlePreviewClick = () => {
        setSeverity("warning");
        setMessage(
            <Typography variant='body1'>Questa feature non è ancora implementata completamente</Typography>
        );

        setOpenSnackBar(true);

        setTimeout(router.push('/menu/' + businessName), 3000);
    };

    const handleSnackbarClose = () => {    
        setOpenSnackBar(false);
    };

    return(
        <React.Fragment>
            <Drawer open={props.open} onClick={props.handleClick}>
                <List sx={{ width: "12vw" }} onClick={props.handleClick}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={ () => { router.push('/account') } }>
                            <ListItemIcon>
                                <AccountCircleIcon></AccountCircleIcon>
                            </ListItemIcon>
                            <ListItemText primary="Profilo" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={ () => { router.push('/admin') } }>
                            <ListItemIcon>
                                <RestaurantMenuIcon></RestaurantMenuIcon>
                            </ListItemIcon>
                            <ListItemText primary="Menus" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleQrClick}>
                            <ListItemIcon>
                                <QrCodeIcon></QrCodeIcon>
                            </ListItemIcon>
                            <ListItemText primary="Codice QR" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handlePreviewClick}>
                            <ListItemIcon>
                                <PreviewIcon></PreviewIcon>
                            </ListItemIcon>
                            <ListItemText primary="Menu attivo" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <CustomSnackbar open={openSnackBar} handleClose={handleSnackbarClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    )
}