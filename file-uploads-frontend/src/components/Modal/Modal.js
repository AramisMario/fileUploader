import React,{useEffect,useState, Fragment} from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import "./Modal.css";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";
const Modal = (props) =>{

  const {fId,closeModal} = props;
  let modalRoot = document.getElementById("modalRoot");

  const [content,setContent] = useState({file:"",data:""});

  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/file/showFile/'+fId+'/',{
      headers:{
        "authorization":"Bearer "+token,
      }
    })
    .then((response)=>setContent(response.data)).catch((error)=>console.log(error));
  },[]);

  const handleDownload = () =>{
    let image_data = atob(content.file);
    let arraybuffer = new ArrayBuffer(image_data.length);
    let view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    let blob = undefined;
    try {
        blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
    } catch (e) {
        let bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
        bb.append(arraybuffer);
        blob = bb.getBlob('application/octet-stream');
    }
    let url = (window.webkitURL || window.URL).createObjectURL(blob);
    window.location.href = url;
  }

  const modalContent = (
    <div className="modalContainer">
      <div className="modal">
            <Grid 
              container
              direction="row"
              justify="center"
              style={{height:"60vh",width:"60vw"}}>
                <Grid 
                  item
                  md={12}
                  sm={12}
                  style={{height:"5vh",width:"60vw"}}
                >
                  <CloseIcon onClick={()=>closeModal()}/>
                </Grid>
                <Grid container direction="row" justify="center">
                    {
                      (function(){
                        if(content.data.indexOf("video") !== -1){
                            return(
                                <video  width="300px" height="300px" controls>
                                    <source src={content.data+", "+content.file}/>
                                </video>
                            );
                        }
                        if(content.data.indexOf("image") !== -1){
                             return(
                               <Fragment>
                                <img  
                                style={{maxHeight:"50vh",maxWidth:"50vh"}}
                                src={content.data+", "+content.file}
                                alt="no image" 
                                className="img-fluid"/>
                               </Fragment>
                                 
                             );
                         }
                        if(content.data.indexOf("audio") !== -1){
                             return(
                                 <audio controls>
                                     <source src={content.data+", "+content.file} />
                                 </audio>
                             );
                         }                       
                        // return(
                        //     <Typography variant="h6">
                        //       No se puede visualizar el archivo
                        //     </Typography>
                        // );                                                     
                      })()
                    }
                </Grid>
                <br/>
                <Button onClick={handleDownload}style={{maxHeight:"30px"}} variant="outlined">Descargar</Button>
            </Grid>
      </div>
    </div>
  );

  return createPortal(modalContent,modalRoot);
}

export default Modal;