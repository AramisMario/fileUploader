import React,{useEffect,useState, Fragment} from "react";
import Modal from "../Modal/Modal";

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Typography from '@material-ui/core/Typography';

const FileList = (props) =>{
    const {files} = props;
    const [isOpen, setOpen] = useState(false);
    const [fId, setFId] = useState(-1);

    const handleClick = (fId) =>{
        setOpen(true);
        setFId(fId);
    }

    const closeModal = () =>{
        setOpen(false);
    }

    return(
        <Fragment>
            <List style={{minWidth:"70vw"}}>
                {files && files.map((file,index)=>{
                       return(
                        <ListItem
                            button
                            onClick={()=>handleClick(file.fId)}
                            divider key={index}
                        >  
                            <ListItemIcon>
                                {(function(){
                                    if(file.data.indexOf("image/")!==-1){
                                        return(<ImageIcon/>)
                                    }else if(file.data.indexOf("video/")!==-1){
                                        return(<MovieIcon/>)
                                    }
                                    else if(file.data.indexOf("audio/")!==-1){
                                        return(<MusicNoteIcon/>)
                                    }else if(file.data.indexOf("pdf")!==-1){
                                        return(<PictureAsPdfIcon/>)
                                    }
                                    else{
                                        return(<InsertDriveFileIcon/>)
                                    }           
                                })()}
                            </ListItemIcon>
                                <Typography variant="body1">
                                {file.name}
                                </Typography>

                        </ListItem>
                       )
                   })}  
            </List>
            {isOpen && <Modal fId={fId} closeModal={closeModal}/>}           
        </Fragment>                          
    );
}

export default FileList;