
import useSWR from 'swr';
import heroes from 'dotaconstants/build/heroes.json'




var backplayerItems=[];

const fetcher = (url) => fetch(url).then((res) => res.json());
var imersionhero;
const MatchDetails = ({ matchId, playerId }) => {

  backplayerItems=[];
 
  const { data, error } = useSWR(`https://api.opendota.com/api/matches/${matchId}`, fetcher);

  if (error) return <div>Error loading match details.</div>;
  if (!data || !data.players) return <div>Loading match details...</div>;

  // Find the player by playerId
  const playerData = data.players.find(player => player.account_id === playerId);
 
 
  if (!playerData) return <div>Player not found in match.</div>;
  
 

  
  const heroid = playerData.hero_id; 
  const hero = heroes[heroid];
  const heroname = hero ? hero.name : "Unknown Hero";
  const imgname = heroname.substring(14);
  const imgconst = `./heroes/${imgname}.jpg`;
  imersionhero = imgname;
  

};

export {imersionhero};

export default MatchDetails;
