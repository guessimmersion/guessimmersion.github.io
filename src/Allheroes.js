import React, { useState } from 'react';
import heroes from 'dotaconstants/build/heroes.json';
import useSWR from 'swr';
import { imersionhero } from './SWR';
import './App.css'; // Make sure to add a CSS file for custom styles

var guess = false;

const Allheroes = ({ matchid }) => {
  const [selectedHero, setSelectedHero] = useState(null); // State to track selected button

  const handleRedirect = (e) => {
    const selected = e.target.value;
    setSelectedHero(selected); // Update selected hero

    if (selected === imersionhero) {
      guess = true;
    } else {
      guess = false;
    }
  };

  const fetcher = (url) => fetch(url).then((res) => res.json());
  var hero_id = [];
  const { data, error } = useSWR(`https://api.opendota.com/api/matches/${matchid}`, fetcher);

  if (error) return <div>Error loading match details.</div>;
  if (!data || !data.players) return <div>Loading match details...</div>;

  hero_id = data.players.map(player => player.hero_id);

  if (!Array.isArray(hero_id) || hero_id.length === 0) {
    return <div id='heroes'>No hero ID provided</div>;
  }

  const buttonmap = hero_id.map(heroid => {
    const hero = heroes[heroid];
    const heroname = hero ? hero.name : "Unknown Hero";
    const imgname = heroname.substring(14); 
    const imgconst = `./img/heroes/${imgname}.jpg`;

    return (
      <button
        key={heroid} // Add a key for each button
        className={`hero ${selectedHero === imgname ? 'selected' : ''}`} // Add selected class if the button is clicked
        value={imgname}
        onClick={handleRedirect}
        style={{ backgroundImage: `url(${imgconst})` }}
      >
      </button>
    );
  });

  return <div id='heroes'>{buttonmap}</div>;
};

export { guess };
export default Allheroes;
