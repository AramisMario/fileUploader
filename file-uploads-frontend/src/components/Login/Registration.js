import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));

const Registration = () =>{
    const [userInfo, setUserInfo] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    let history = useHistory();
    const classes = useStyles();
    const TextFieldStyle = {margin:"5px",width:"42%"}  
    

    useEffect(()=>{
        const {username,email,password} = userInfo;
        if((username && email && password) !== undefined) setIsDisabled(false);
        if((username && email && password) === "") setIsDisabled(true);
      },[userInfo]);

    const handleChange = (e) =>{
        setUserInfo({...userInfo,[e.target.id]:e.target.value});
    }


    const SignUp = () =>{
        axios.post('http://localhost:8000/auth/signUp/',{
            "username":userInfo.username,
            "email":userInfo.email,
            "password":userInfo.password
        }).then((response)=>{
          console.log(response);
          if(response.data.token){
            localStorage.setItem('token',response.data.token);
            history.push("/home");      
          }else if(response.data.message){
            console.log("datos incorrectos");
          }
        }).catch((error)=>console.log(error));
      }

    return(
        <Grid
        style={{minHeight:"100vh"}}
        container
        direction="row"
        justify="center"
        alignItems="center"
        >
            <div className={classes.root}>
                <Paper style={{minWidth:"50vw",minHeight:"50vh"}} elevation={5}>
                    <Grid
                        style={{minHeight:"100%",minWidth:"100%"}} 
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >   
                        <TextField
                            id="username"
                            onChange={handleChange}
                            style={TextFieldStyle} 
                            label="Username" 
                            variant="outlined" />

                        <TextField
                            id="email"
                            onChange={handleChange}
                            style={TextFieldStyle} 
                            label="Email" 
                            variant="outlined" />

                        <TextField
                            id="password"
                            onChange={handleChange}
                            style={TextFieldStyle} 
                            type="password" 
                            label="Password" 
                            variant="outlined" />

                        <Button 
                            style={{width:"42%"}} 
                            variant="outlined" 
                            color="primary"
                            disabled={isDisabled}
                            onClick={SignUp}
                            >
                            SignUp
                        </Button>
                    </Grid>  
                </Paper>
            </div>
        </Grid>
    );
}

export default Registration;