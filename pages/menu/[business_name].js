import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getMenuFull } from '../../lib/api';
import { TabPanel } from '../../components/TabPanel';
import Dish from '../../components/Dish'
import Alert from '@mui/material/Alert';
import CustomSnackbar from '../../components/CustomSnackBar';

export default function Post() {
    const router = useRouter();
    const { business_name } = router.query;
    const [menu, setMenu] = React.useState();
    const [value, setValue] = React.useState(0);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [message, setMessage] = React.useState("Lorem Ipsum");
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleSnackbarClose = () => {    
        setOpenSnackBar(false);
    };

    React.useEffect(() => {
        getMenuFull(business_name)
        .then(async (response) => [await response.json(), response])
        .then(([data, res]) => {
            if(res.status == 200) {
                setMenu(data);
            } else {
                setSeverity("error");
                setMessage(
                    <React.Fragment>
                        <Typography variant='body1'>Errore API</Typography>
                        <Typography variant='body2'>{data.msg}</Typography>
                    </React.Fragment>
                );
                setOpenSnackBar(true);
            }
        });
    }, [business_name]);

    const renderDish = (dishCategories, category) => {
        let result = false

        dishCategories.forEach((dishCategory) => {
            if(dishCategory.name === category){
                result = true;
            }
        });

        return result;
    }

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Paper elevation={1} sx={{ height: "100%", width: "50%", padding: "3%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Typography variant='h1' gutterBottom>{business_name}</Typography>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "2%" }}>
                        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                        {
                            menu && menu.categories.map((category) => (
                                <Tab label={category.name} key={category._id}/>
                            ))
                        }
                        </Tabs>
                    </Box>
                    {
                        menu ? menu.categories.map((category, index) => {
                            return(
                                <TabPanel value={value} index={index} key={category._id}>
                                    {
                                        menu.menu.dishes.filter((dish) => renderDish(dish.categories, category.name)).length !== 0 ?
                                        <Stack spacing={2}>
                                        {
                                            menu.menu.dishes.filter((dish) => renderDish(dish.categories, category.name)).map((dish) => {
                                                return (
                                                    <Dish dish={dish} key={dish._id}></Dish>
                                                )
                                            })
                                        }
                                        </Stack>
                                        :
                                        <Alert severity="info" variant="filled">Non ci sono piatti in questa categoria!</Alert>
                                    }
                                    
                                </TabPanel>
                            )
                        })
                        :
                        <Alert severity="warning" variant="filled">Non esiste un'attività con questo nome oppure l'attività non ha un menu attivo al momento</Alert>
                    }
                </Box>
            </Paper>
            <CustomSnackbar open={openSnackBar} handleClose={handleSnackbarClose} severity={severity} message={message}></CustomSnackbar>
        </Box>
    )
}