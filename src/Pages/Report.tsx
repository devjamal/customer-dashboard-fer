import React, { useState } from "react";

import {  Typography, Grid, makeStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FooterSection from '../Components/Footer'



import CircularProgress from '@material-ui/core/CircularProgress';
import { httpClient } from "../Common/Service";
import ResponsiveDrawer  from './Drawer'





const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white',
        width: 185,
        margin: 10

    },
    margin: {
        margin: theme.spacing(1),

    }, main:
    {
        width: 270
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 3),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    title: {
        fontSize: 14,
    },
    tab: {
        width: "100%",
    },
}));


const Reports = () => {
    const classes = useStyles();
    const [customerTotal , setCustomerTotal]=React.useState("")
    const [memberCount , setMemberCount] = React.useState("")
    const [loading, setLoading] = useState(true)




    const fetchCount = async () => {

        try {
            //@ts-ignore
            const result = await httpClient("customer/count", "POST", { "project": "GET_COUNT" })
            
            if(result.data){
            setCustomerTotal(result.data.CustomerCount)
            setMemberCount(result.data.userCount)
            setLoading(false)

            }

        }
        catch (error) {
            console.error(error);
        }
    }







    React.useEffect(() => {
        document.title = "Live Stats | JAMAN HP GAS  "
        fetchCount()
    }, []);



    return (
        <React.Fragment>
        
 
            <CssBaseline />
            <ResponsiveDrawer/>

                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">

                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">


                                    <Card className={classes.main}>
                                        <CardContent>

                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Total  Customer
                                                </Typography>
                                            {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /> </div> : <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                                {customerTotal}

                                            </Typography>
                                            }


                                        </CardContent>

                                    </Card>
                                </Grid>

                            </div>
                            <Grid container spacing={4} style={{marginTop:"50px"}}>

                                <Grid item xs={12} sm={12} md={6}>
                                    <Card className={classes.card}>

                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Team Member Count 
                                        </Typography>
                                            <Typography>
                                                {memberCount}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>

                                        </CardActions>
                                    </Card>
                                </Grid>



                            </Grid>

                        </Container>
                    </div>


                </main>
                <FooterSection/>
            


        </React.Fragment >
    );


}

export default Reports