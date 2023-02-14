import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';

function Headers(props) {
    return (
        <React.Fragment>
            {
                props.table === "menu" &&
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Piatti</TableCell>
                    <TableCell align="right">Orario di attività - inizio</TableCell>
                    <TableCell align="right">Orario di attività - fine</TableCell>
                </TableRow>
            }
            {
                props.table === "dishes" &&
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Descrizione</TableCell>
                    <TableCell align="right">Ingredienti</TableCell>
                    <TableCell align="right">Categorie</TableCell>
                </TableRow>
            }
        </React.Fragment>        
    )
}

export default function AdminTable(props) {
  return (
    <React.Fragment>
        <TableContainer component={Paper} sx={{ width: "90%", margin: "5%" }}>
            <Table>
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
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">
                                        <Alert severity="warning">
                                            <Typography variant='body1'>W.I.P Work In Progress</Typography>
                                        </Alert>
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
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">
                                        <Alert severity="warning">
                                            <Typography variant='body1'>W.I.P Work In Progress</Typography>
                                        </Alert>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Alert severity="warning">
                                            <Typography variant='body1'>W.I.P Work In Progress</Typography>
                                        </Alert>
                                    </TableCell>
                                </TableRow>     
                            ))
                        }
                    </React.Fragment>
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
  );
}
/*
{
    props.table === "menu" && rows.map((row) => (
        <TableRow
            key={row._id}
        >
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">
                <Alert variant="filled" severity="warning">
                    <Typography variant='body1'>W.I.P Work In Progress</Typography>
                </Alert>
            </TableCell>
            <TableCell align="right">{row.start_time}</TableCell>
            <TableCell align="right">{row.end_time}</TableCell>
        </TableRow>     
    ))
}
{
    props.table === "dishes" && rows.map((row) => (
        <TableRow
            key={row._id}
        >
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">ids</TableCell>
            <TableCell align="right">ids</TableCell>
        </TableRow>     
    ))
}*/