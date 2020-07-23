import React from "react";
import {useHistory} from "react-router-dom";
import MyFiles from "./MyFiles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Home = () => {
    let history = useHistory();
    return(
        <Grid
            style={{minHeight:"100vh"}}
            container
            direction="column"
            justify="center"
            alignItems="center"
         >  
            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>{
                    localStorage.removeItem('token');
                    history.push("/login");
                }}
            >
            LogOut
            </Button>
            <MyFiles/>
        </Grid>
    );
}

export default Home;