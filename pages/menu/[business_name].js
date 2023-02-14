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
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getMenuFull } from '../../lib/api';
import { TabPanel } from '../../components/TabPanel';
import Dish from '../../components/Dish'
import Alert from '@mui/material/Alert';

export default function Post() {
    const router = useRouter();
    const { business_name } = router.query;

    const [menu, setMenu] = React.useState();

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    React.useEffect(() => {
        if(document.cookie.split('=')[1] === "" || document.cookie === ""){
            console.log("no cookie");
        }

        getMenuFull(business_name)
        .then(async (response) => [await response.json(), response])
        .then(([data, res]) => {
            if (res.status == 400 || res.status == 500 || res.status == 401 || res.status == 403) {
                //error
            }
            else {
                //success
                setMenu(data);
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
                        <Tabs value={value} onChange={handleChange}>
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
                        <Alert severity="warning" variant="filled">Non esiste un attività con questo nome!</Alert>
                    }
                </Box>

            </Paper>
        </Box>
    )
}

/*
                                {
                                    menu.menu.dishes.map((dish) => {
                                        console.log(category.name);
                                        
                                        dish.categories.forEach( (dishCategory) => {
                                            console.log(dishCategory.name);
                                            if(dishCategory.name === category.name) {
                                                console.log("true");
                                                <Dish dish={dish} key={dish._id}></Dish>
                                            }
                                        });
                                    })
                                }
*/