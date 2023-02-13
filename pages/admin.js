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

export default function Admin() {
    const [open, setOpen] = React.useState(false);

    
    const handleClick = (event, reason) => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <AdminAppBar handleClick={handleClick}></AdminAppBar>
            <Drawer open={open} onClick={handleClick}>
                <List sx={{ width: "12vw" }} onClick={handleClick}>
                    <ListItem disablePadding>
                        <ListItemButton>
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
                        <ListItemButton>
                            <ListItemIcon>
                                <QrCodeIcon></QrCodeIcon>
                            </ListItemIcon>
                            <ListItemText primary="Codice QR" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}