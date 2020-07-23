import React,{useState} from "react";
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

const LoginPage = () =>{
    const [credentials, setCredentials] = useState({});
    let history = useHistory();
    const classes = useStyles();
    const FieldStyle = {margin:"5px",width:"42%"}

    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.id]:e.target.value})
    }

    const signIn = () =>{
        axios.post('http://localhost:8000/auth/signIn/',{
            "email":credentials.email,
            "password":credentials.password
        }).then((response)=>{
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
                            id="email" 
                            onChange={handleChange}
                            style={FieldStyle} 
                            label="Email" 
                            variant="outlined" />

                        <TextField 
                            id="password"
                            onChange={handleChange}
                            style={FieldStyle} 
                            type="password" 
                            label="Password" 
                            variant="outlined" />
                      
                        <Button 
                            onClick={signIn}
                            style={FieldStyle} 
                            variant="outlined" 
                            color="primary">
                            SignIn
                        </Button>
                        <Button 
                            onClick={()=>history.push("/signup")}
                            style={FieldStyle} 
                            variant="outlined" 
                            color="primary">
                            SignUp
                        </Button>
                    </Grid>
                </Paper>
            </div>
        </Grid> 
    );
}

export default LoginPage;