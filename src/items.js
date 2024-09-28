import React from 'react';
import useSWR from 'swr';
import items from 'dotaconstants/build/item_ids.json'
import  './App'
var item_id=[];
const fetcher = (url) => fetch(url).then((res) => res.json());

const Allitems = ({matchId,playerId}) => {
  item_id=[]
  const { data, error } = useSWR(`https://api.opendota.com/api/matches/${matchId}`, fetcher);

  if (error) return <div>Error loading match details.</div>;
  if (!data || !data.players) return <div>Loading match details...</div>;

  // Find the player by playerId
  const playerData = data.players.find(player => player.account_id === playerId);
 
 
  if (!playerData) return <div>Player not found in match.</div>;
  item_id.push(playerData.item_0,playerData.item_1,playerData.item_2,playerData.item_3,playerData.item_4,playerData.item_5)
  if (!Array.isArray(item_id) || item_id.length === 0) {
    return <div id='items'>No item ID provided</div>;
  }
  const buttonmap = item_id.map(itemid =>{
    if(itemid === 0){
        return <div className='item'></div>
     }
     
     const item = items[itemid];
     const itemname = item ? item.name : "Unknown item";
     const imgconst =`./img/items/${item}.jpg`;
     
     
  
     
     return (
     
     
         <div className='item' style={{backgroundImage:`url(${imgconst})`}}>{itemname}</div>
        
        
       
    
     
     );


   

  });
 
  return <div id='mainitems'>{buttonmap}</div>;
  
};

export default Allitems;
