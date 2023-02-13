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
import AdminDrawer from '../components/AdminDrawer';
import AdminTable from '../components/AdminTable';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CustomSnackbar from '../components/CustomSnackBar';

export default function Admin() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [table, setTable] = React.useState("menu");
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
    
    const handleDrawerClick = (event, reason) => {
        setOpenDrawer(!openDrawer);
    };

    const handleChange = (event) => {
        setTable(event.target.value);
      };

    const handleSnackbarClick = (event, reason) => {
        /*
        if (reason === 'clickaway') {
            return;
        }
        */
    
        setOpenSnackBar(!openSnackBar);
    };

    return (
        <React.Fragment>
            <AdminAppBar handleClick={handleDrawerClick}></AdminAppBar>
            <AdminDrawer open={openDrawer} handleClick={handleDrawerClick}></AdminDrawer>
            <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Select
                    value={table}
                    onChange={handleChange}
                >
                    <MenuItem value={"menu"}>Menu</MenuItem>
                    <MenuItem value={"dishes"}>Piatti</MenuItem>
                </Select>
                <AdminTable table={table}></AdminTable>
            </Box>
            <CustomSnackbar open={openSnackBar} handleClick={handleSnackbarClick} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    );
}