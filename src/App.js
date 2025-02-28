import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css';
import Home from '../src/assets/pages/Home'

import GLOBE from 'vanta/src/vanta.globe'

function App() {

  
    
  useEffect(()=>{
    GLOBE({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff3f81,
      backgroundColor: 0x23153c,
      showDots: false
    })
  }, [])



  return (
    <Router >
    <div id='vanta'></div>

  
  <Routes>
    <Route path="/" element={<Home />} />
    
  </Routes>
  
</Router>
  );
}

export default App;
