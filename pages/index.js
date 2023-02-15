import React from 'react';
import HomeAppBar from '../components/HomeAppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

export default function Index() {
    const router = useRouter()
    
    return (
        <React.Fragment>
            <HomeAppBar></HomeAppBar>
            <Box sx={{ height: "90vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
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
                        <Button size="small" onClick={() => {router.push("/about")}}>
                            <Typography variant="button" color="primary">Scopri di più</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </React.Fragment>
    )
}
