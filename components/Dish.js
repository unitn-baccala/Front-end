import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

export default function Dish(props){
    return (
        <Card>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <CardMedia
                    component="img"
                    sx={{ width: "20%" }}
                    image="/menu.jpg"
                />
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Stack
                            direction="column"
                            spacing={1}
                        >
                            <Typography variant="h5">
                                {props.dish.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {props.dish.description}
                            </Typography>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                                spacing={1}
                            >
                            {
                                props.dish.ingredients.map((ingredient, index) => (
                                    index === props.dish.ingredients.length-1 ? <Typography key={ingredient._id}>{ingredient.name}</Typography> : <Typography key={ingredient._id}>{ingredient.name + ","}</Typography>
                                ))
                            }
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={1}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                                spacing={2}
                            >
                            {
                                props.dish.categories.map((category) => (
                                    <Chip variant="filled" color="primary" label={category.name} key={category._id}/>
                                ))
                            }
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Stack>
      </Card>
    )
}