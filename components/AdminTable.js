import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Headers(props) {
    return (
        <React.Fragment>
            {
                props.table === "menu" &&
                <React.Fragment>
                    <TableRow>
                        <TableCell>Menu</TableCell>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">Piatti</TableCell>
                        <TableCell align="right">Orario di attività - inizio</TableCell>
                        <TableCell align="right">Orario di attività - fine</TableCell>
                    </TableRow>
                </React.Fragment>
            }
            {
                props.table === "dishes" &&
                <React.Fragment>
                    <TableRow>
                        <TableCell>Piatti</TableCell>
                        <TableCell align="right">Nome</TableCell>
                        <TableCell align="right">Descrizione</TableCell>
                        <TableCell align="right">Ingredienti</TableCell>
                        <TableCell align="right">Categorie</TableCell>
                    </TableRow>
                </React.Fragment>
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
  );
}