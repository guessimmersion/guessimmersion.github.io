import './App.css';
import './SWR';
import './Allheroes';
import MatchDetails from './SWR';
import Allheroes from './Allheroes'; // Import corrected to avoid re-import
import Allitems from './items';
import Backitems from './backpack';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Make sure `matchid` is defined in a way that fits your use case
let matchid = 0;

function Game() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(null); // Initialize as null
  const [random, setRandom] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * (500 - 0) + 0);
    setRandom(randomNumber);
  }, []);

  useEffect(() => {
    if (random !== null) {
      setLoading(true); // Set loading to true when fetching data
      setError(null); // Clear previous errors

      const source = axios.CancelToken.source();

      axios.get('https://immersionbackend.onrender.com/matches', { cancelToken: source.token })
        .then(response => {
          if (response.data && response.data[random]) {
            setMatches(response.data[random]);
          } else {
            console.error('No data available at the random index.');
            setMatches(null);
          }
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message);
          } else {
            console.error('Error fetching data:', error);
            setError(error);
            setMatches(null);
          }
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the request is done
        });

      // Cleanup function to cancel the request if the component unmounts
      return () => {
        source.cancel('Operation canceled by the user.');
      };
    }
  }, [random]);

  // Determine matchid based on matches
  matchid = matches?.match_id || 0;
  const playerid = 86853590;

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <>
          <div>
            <MatchDetails matchId={matchid} playerId={playerid} />
          </div>
          <div className='items'>
            <Allitems matchId={matchid} playerId={playerid} />
            <Backitems matchId={matchid} playerId={playerid} />
          </div>
          <div id='heroes'>
            <Allheroes matchid={matchid} />
            <button id='conf' onClick={() => { navigate("/Over") }}>Confirm</button>
          </div>
        </>
      )}
    </div>
  );
}

export { matchid };
export default Game;
