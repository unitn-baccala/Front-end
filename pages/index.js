import React from 'react';
import { StrictMode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import HomeAppBar from '../components/HomeAppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../styles/Link.module.css'
import Link from 'next/link'

export default function App() {
  return (
    <React.Fragment>
        <HomeAppBar></HomeAppBar>
        <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Card elevation={2} sx={{ height: "50%", width: "50%" }}>
                <CardMedia
                    sx={{ height: "50%" }}
                    image="/menu.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        Baccalà
                    </Typography>
                    <Typography variant="body1">
                        Il servizio numero uno per la gestione del tuo menù digitale!
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">
                        <Link href="/about" className={styles.linkOnWhite}>Scopri di più</Link>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </React.Fragment>
  )
}
