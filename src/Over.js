import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
  } from "react-router-dom";
  import { guess } from './Allheroes';
  import { matchid } from './Game';
  import { imersionhero } from './SWR';
  
function Over(){
  const imgconst =`./img/heroes/${imersionhero}.jpg`;
    const navigate = useNavigate();

  const handleRedirect = (e) => {
    if(e.target.value==="main"){
      navigate('/'); 
    }
    else{
      navigate("/game");
  }
};
if(guess){
   return (
    <div id='over'>
      <br/>
      <h1>You Won</h1>
      <h1>AndreyImmersion Hero:</h1>
      <img src={imgconst} alt={imersionhero}/>
      <h1>Match ID: {matchid}</h1>
      <a href={`https://www.dotabuff.com/matches/${matchid}`}>DotaBuff </a>
      <a href={`https://stratz.com/matches/${matchid}`}>STRATZ </a>
      <a href={`https://www.opendota.com/matches/${matchid}`}>OpenDota</a>
    <button value="next" className='over' onClick={handleRedirect}>Next Game</button>
    <button value="main" className='over' onClick={handleRedirect}> Main Menu</button>
    </div>
   );}
   else{
    return(
      <div id='over'>
        <br/>
        <h1>You Lost</h1>
        <h1>AndreyImmersion Hero:</h1>
        <img src={imgconst} alt={imersionhero}/>
        <h1>Match ID: {matchid}</h1>
        
        <a href={`https://www.dotabuff.com/matches/${matchid}`}>DotaBuff </a>
        <a href={`https://stratz.com/matches/${matchid}`}>STRATZ </a>
        <a href={`https://www.opendota.com/matches/${matchid}`}>OpenDota </a>
      <button className='over' value="next" onClick={handleRedirect}>Next Game</button>
      <button className='over' value="main" onClick={handleRedirect}> Main Menu</button>
      </div>
    );
   }
}
export default Over;