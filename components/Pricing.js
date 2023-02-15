import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomSnackbar from './CustomSnackBar';

const tiers = [
  {
    title: 'Demo',
    subheader: 'Sperimenta con il nostro servizio',
    price: '0',
    description: [
      '1 menu',
    ],
    buttonText: 'Prova gratis',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Inizia a lavorare con Baccalà',
    price: '10',
    description: [
      '100 menu',
      'Codice QR',
    ],
    buttonText: 'Abbonati',
    buttonVariant: 'contained',
  },
];

export default function Pricing() {
    const [open, setOpen] = React.useState();

    const handleClick = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
            Prezzi
            </Typography>
        <Container maxWidth="md">
            <Grid container spacing={5} alignItems="flex-end" justifyContent="center" direction="row">
            {
                tiers.map((tier) => (
                    <Grid
                        item
                        key={tier.title}
                        xs={12}
                        md={4}
                    >
                        <Card>
                            <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                sx={{
                                    backgroundColor: "#eeeeee"
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        {tier.price}€
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography>
                                </Box>
                                <ul>
                                    {
                                        tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                        >
                                            {line}
                                        </Typography>
                                        ))
                                    }
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant={tier.buttonVariant} onClick={handleClick}>
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
            </Grid>
        </Container>
        <CustomSnackbar open={open} handleClose={handleClose} severity="warning" message="Questa feature non è ancora implementata!"></CustomSnackbar>
        </React.Fragment>
    )
}
