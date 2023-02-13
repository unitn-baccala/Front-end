import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import styles from '../styles/Link.module.css'

export default function HomeAppBar() {
  return (
    <Box sx={{ widht: "100%" }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Baccalà
            </Typography>
            <Button>
                <Link href="/signup" className={styles.link}>Registrati</Link>
            </Button>
            <Button>
                <Link href="/signin" className={styles.link}>Login</Link>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}