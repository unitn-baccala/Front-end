import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import Stack from '@mui/material/Stack';
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

export default function About() {
    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Paper elevation={3} sx={{ width: "50%", padding: "3%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Typography variant='h1' gutterBottom>About</Typography>
                <Pricing></Pricing>
                <Typography sx={{ marginTop: "5%" }}>Qui puoi trovare la documentazione del servizio: <Link href="http://localhost:3000/api/docs/">Docs</Link></Typography>
            </Paper>
        </Box>
    )
}