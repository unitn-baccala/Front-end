import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AdminAppBar from '../components/AdminAppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Typography } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackBar';
import { useRouter } from 'next/router'

export default function AdminDrawer(props) {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
    const router = useRouter()

    const handleSnackbarClick = (event, reason) => {
        setSeverity("warning");
        setMessage(
            <Typography variant='body1'>W.I.P Work In Progress</Typography>
        );
    
        setOpenSnackBar(!openSnackBar);
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
                        <ListItemButton>
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
                        <ListItemButton onClick={handleSnackbarClick}>
                            <ListItemIcon>
                                <QrCodeIcon></QrCodeIcon>
                            </ListItemIcon>
                            <ListItemText primary="Codice QR" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <CustomSnackbar open={openSnackBar} handleClick={handleSnackbarClick} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    )
}