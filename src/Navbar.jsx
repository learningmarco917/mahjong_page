import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to = "/mahjong_page/" className="navbar-brand">
          港式台麻番表
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/mahjong_page/" onClick={() => setIsOpen(false)}>首頁</Link></li>
          <li><Link to="/mahjong_page/cal" onClick={() => setIsOpen(false)}>麻將聽牌計算機</Link></li>
          <li><Link to="/mahjong_page/rule" onClick={() => setIsOpen(false)}>規則</Link></li>
          <li><Link to="/mahjong_page/about" onClick={() => setIsOpen(false)}>關於</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;