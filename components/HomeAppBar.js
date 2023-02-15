import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function HomeAppBar() {
    const router = useRouter()

    return (
        <Box sx={{ widht: "100%" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Baccalà
                    </Typography>
                    <Button color="inherit" onClick={() => {router.push("/signup")}}>
                        <Typography variant="button" color="white">Registrati</Typography>
                    </Button>
                    <Button color="inherit" onClick={() => {router.push("/signin")}}>
                    <Typography variant="button" color="white">Login</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}