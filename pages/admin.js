import React from 'react';
import Box from '@mui/material/Box';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import AdminTable from '../components/AdminTable';
import CustomSnackbar from '../components/CustomSnackBar';
import { getMenu } from '../lib/api';
import { LinearProgress } from '@mui/material';
import { getDish } from '../lib/api';
import { useRouter } from 'next/router'
import { readCookie } from '../lib/cookie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Admin() {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [table, setTable] = React.useState("menu");
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
    const [rows, setRows] = React.useState();
    const router = useRouter()

    React.useEffect(() => {
        if(readCookie("token") === null){
            router.push("/signin");
        } else {
            handleChange("menu");
        }
    }, []);
    
    const handleDrawerClick = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleSnackbarClose = () => {    
        setOpenSnackBar(false);
    };

    const handleChange = (value) => {
        setTable(value);

        if(readCookie("token") === null){
            router.push("/login");
        } else if (value === "menu"){
            getMenu(readCookie("token"))
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if(res.status == 200) {
                    setRows(data);
                } else if(res.status == 403) {
                    router.push('/signin')
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
            });
        } else if (value === "dishes"){
            getDish(readCookie("token"))
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if(res.status == 200) {
                    setRows(data);
                } else if(res.status == 403) {
                    router.push('/signin')
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
            });
        }
    };

    return (
        <React.Fragment>
            <AdminAppBar handleClick={handleDrawerClick}></AdminAppBar>
            <AdminDrawer open={openDrawer} handleClick={handleDrawerClick}></AdminDrawer>
            <Box sx={{ height: "100%", width: "90%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", margin: "5%"}}>
                <FormControl sx={{ width: "90%" }}>
                    <InputLabel>Tabella</InputLabel>
                    <Select
                        value={table}
                        onChange={(event) => {handleChange(event.target.value)}}
                        label="Tabella"
                    >
                        <MenuItem value={"menu"}>Menu</MenuItem>
                        <MenuItem value={"dishes"}>Alimenti</MenuItem>
                        <MenuItem value={"ingredients"}>Ingredienti</MenuItem>
                        <MenuItem value={"categories"}>Categorie</MenuItem>
                    </Select>
                </FormControl>
                {
                    rows ?
                    <AdminTable table={table} rows={rows} handleChange={handleChange} setRows={setRows}></AdminTable>
                    :
                    <Box sx={{ width: "90%", margin: "5%" }}>
                        <LinearProgress />
                    </Box>
                }
            </Box>
            <CustomSnackbar open={openSnackBar} handleClose={handleSnackbarClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    );
}