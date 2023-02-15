import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from 'next/link'
import Pricing from '../components/Pricing';

export default function About() {
    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Paper elevation={3} sx={{ width: "50%", padding: "3%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Typography variant='h1' gutterBottom>About</Typography>
                <Pricing></Pricing>
                <Typography sx={{ marginTop: "5%" }}>
                    Qui puoi trovare la documentazione del servizio: <Link href="http://localhost:3000/api-docs/">Docs</Link>
                </Typography>
            </Paper>
        </Box>
    )
}