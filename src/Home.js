import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
  } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    const handleRedirect = (e) => {
      navigate("/game");

    }

  return(
    <div id="home"> 
      <button onClick={handleRedirect} id="play">Play</button>

    </div>
   
  );
};
export default Home;