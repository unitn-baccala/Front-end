import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function AdminAppBar(props) {
  return (
    <Box sx={{ widht: "100%" }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ marginRight: 2 }}
                onClick={props.handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Admin
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}