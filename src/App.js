import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './Game';
import Over from './Over'
import Home from './Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/over" element={<Over />}/>
      <Route path='/game' element={<Game/>}/>
    </Routes>
  );
}

export default App;
