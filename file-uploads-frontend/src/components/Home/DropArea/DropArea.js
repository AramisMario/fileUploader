import React,{useEffect, useState} from "react";
import axios from "axios";
import './DropArea.css';
const DropArea = (props) =>{
    const {setFiles} = props;
    const [classes,setClasses] = useState("noDraging");

    const handleDrop = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        const reader = new FileReader();
        const name = e.dataTransfer.files[0].name
        reader.onload = () =>{
            let file = reader.result;
            const token = localStorage.getItem('token');
            axios.post('http://127.0.0.1:8000/file/withDrop/',{
            "file":file,
            "name":name
            },{
                headers:{
                    "content-type":"application/json",
                    "authorization":"Bearer "+token
                }
            }).then((response)=>{
                setFiles(response.data.filesInfo);
            })
            .catch((error)=>console.log(error));
            }
        reader.readAsDataURL(e.dataTransfer.files[0]);
        setClasses("noDraging");
    };

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        setClasses("draging");
      };

      const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        setClasses("noDraging");
      };

      const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        setClasses("draging");
      };

      const handleDragStart = e => {
        e.preventDefault();
        e.stopPropagation();
        setClasses("draging");
      };

    return(
        <div 
            className={classes}
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e)=>handleDragEnter(e)}
            onDragLeave={(e)=>handleDragLeave(e)}
            onDragStart={(e)=>handleDragStart(e)}
        >   
            {props.children}
        </div>
    );
}

export default DropArea;