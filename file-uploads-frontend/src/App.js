import React,{useEffect} from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Login/Registration";
import Home from "./components/Home/Home";

function App() {
  useEffect(()=>console.log("app"));
  return(
    <React.Fragment>
      <BrowserRouter>
        <Route exact path="/login" component={Login}/>
        <Route excat path="/home" component={Home}/>
        <Route exact path="/signup" component={Registration}/>
      </BrowserRouter>
    </React.Fragment>
  );
 
}

export default App;
