import React,{useState,useEffect} from "react";
import DropArea from "./DropArea/DropArea";
import axios from "axios";
import FileList from "./FileList";
import Paper from "@material-ui/core/Paper";
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

const MyFiles = (props) =>{
    const [files, setFiles] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/file/showInfo/',{
          headers:{
            "authorization":"Bearer "+token,
          }
        })
            .then((response)=>{setFiles(response.data.filesInfo)})
            .catch((error)=>console.log(error));
    },[]);
    return(
        <div className={classes.root}>
            <Paper style={{minWidth:"70vw",minHeight:"70vh",overflowY:"auto"}} elevation={5}>    
                    <Grid
                        container
                        style={{minHeight:"100%",minWidth:"100%"}}
                        direccion="column"
                        justify="flex-start"
                    >  
                    <DropArea setFiles={setFiles}>
                       <FileList files={files}/>
                    </DropArea>
                    </Grid>
            </Paper>
        </div>  
        );
    }

export default MyFiles;