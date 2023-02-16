import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { deleteMenu } from '../lib/api';
import CustomSnackbar from './CustomSnackBar';
import { readCookie } from '../lib/cookie';
import AddMenu from './AddMenu';

function Headers(props) {
    return (
        <React.Fragment>
            {
                props.table === "menu" &&
                <TableRow>
                    <TableCell><Checkbox disabled></Checkbox></TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Piatti</TableCell>
                    <TableCell align="right">Orario di attività - inizio</TableCell>
                    <TableCell align="right">Orario di attività - fine</TableCell>
                </TableRow>
            }
            {
                props.table === "dishes" &&
                <TableRow>
                    <TableCell><Checkbox disabled></Checkbox></TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrizione</TableCell>
                    <TableCell>Ingredienti</TableCell>
                    <TableCell>Categorie</TableCell>
                </TableRow>
            }
            {
                props.table !== "menu" && props.table !== "dishes" &&
                <TableRow>
                    <TableCell>
                        <Alert severity="warning">WIP - Questa feature non è ancora implementata</Alert>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment>        
    )
}

export default function AdminTable(props) {
    const [selected, setSelected] = React.useState([]);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleSnackbarClose = () => {    
        setOpenSnackBar(false);
    };
    
    const isSelected = (id) => {
        return selected.indexOf(id) != -1;
    }

    const handleRowClick = (id) => {
        if(selected.length < 0){
          setSelected([id]);
        } else if (!isSelected(id)) {
          setSelected(selected.concat(id));
        } else {
          setSelected(selected.filter((selected) => {
            return selected != id;
          }));
        }
    };

    const handleDelete = () => {
        const token = readCookie("token");

        selected.forEach(async (selected) => {
            deleteMenu(token, selected)
            .then(async (response) => [await response.json(), response])
            .then(([data, res]) => {
                if(res.status != 200) {
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
        })

        const rows = props.rows.filter((row) => {
            return !selected.includes(row._id)
        })

        props.setRows(rows)

        setSelected([]);

        props.handleChange("menu");
    }

    return (
        <React.Fragment>
            <Paper sx={{ width: "90%", margin: "3%" }}>
                <Toolbar>
                    {
                        props.table === "menu" ?
                        (
                            selected.length > 0 ? (
                                <React.Fragment>
                                    <Typography variant="h6" sx={{ flex: '1 1 100%' }}>{selected.length + " selezionati"}</Typography>
                                    <IconButton onClick={handleDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Typography variant="h6" sx={{ flex: '1 1 100%' }}>Elementi</Typography>
                                    <IconButton onClick={handleClickOpen}>
                                        <AddIcon/>
                                    </IconButton>
                                    <AddMenu open={open} handleClose={handleClose} handleChange={props.handleChange} setRows={props.setRows} rows={props.rows}></AddMenu>
                                </React.Fragment>
                            )
                        ) : (
                            <Typography variant="h6" sx={{ flex: '1 1 100%' }}>Elementi</Typography>
                        )
                    }
                </Toolbar>
                <TableContainer sx={{ height: "50vh" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <Headers table={props.table}></Headers>
                        </TableHead>
                        <TableBody>
                            <React.Fragment>
                                {
                                    props.table === "menu" && 
                                    props.rows.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            selected={isSelected(row._id)}
                                            hover
                                        >
                                            <TableCell onClick={() => handleRowClick(row._id)}>
                                                <Checkbox checked={isSelected(row._id)}/>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                <Alert severity="warning">WIP - Lista dei piatti</Alert>
                                            </TableCell>
                                            <TableCell align="right">{Math.trunc(row.start_time / 60)}:{(row.start_time % 60).toString().padStart(2, '0')}</TableCell>
                                            <TableCell align="right">{Math.trunc(row.end_time / 60)}:{(row.end_time % 60).toString().padStart(2, '0')}</TableCell>
                                        </TableRow>     
                                    ))
                                }
                                {
                                    props.table === "dishes" && 
                                    props.rows.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            hover
                                        >
                                            <TableCell>
                                                <Checkbox disabled/>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                <Alert severity="warning">WIP - Lista degli Ingredienti</Alert>
                                            </TableCell>
                                            <TableCell>
                                                <Alert severity="warning">WIP - Lista delle Categorie</Alert>
                                            </TableCell>
                                        </TableRow>     
                                    ))
                                }
                            </React.Fragment>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <CustomSnackbar open={openSnackBar} handleClose={handleSnackbarClose} severity={severity} message={message}></CustomSnackbar>
        </React.Fragment>
    );
}