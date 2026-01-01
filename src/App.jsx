import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Cal from './pages/Cal';
import Rule from './pages/Rule';


function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
                <Route path="/mahjong_page/" element={<Home />} />
                <Route path="/mahjong_page/about" element={<About />} />
                <Route path="/mahjong_page/cal" element={<Cal />} />
                <Route path="/mahjong_page/rule" element={<Rule />} />
              </Routes>
          </main>
        </div>
      </Router>
      
    </>
  )
}

export default App
