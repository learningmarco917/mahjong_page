import React from 'react';
import './About.css';


const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">關於本網站</h1>

        <div className="about-content">
          <p className="description">
            這是一個<strong>港式台麻</strong>番數的工具。
          </p>
          <p className="description">
            方便大家打牌時<strong>快速查詢</strong>
          </p>

          <div className="author-section">
            <p className="author">
              本網站由一位
              <span className="highlight">廢柴畢業生</span>
              含淚、熬夜製作 (っ´ω`)っ
            </p>
          </div>

          <div className="donate-section">
            <p className="donate-text">
              如果大家用得開心，<br />
              請高抬貴手Donate支持我~<br />
              <span className="cute-face">( ´•̥̥̥ω•̥̥̥` )</span>
            </p>

            <div className="payme-container">
              <img src="/mahjong_page/assets/payme.jpg" alt="PayMe 二維碼" className="payme-image" />
              <p className="payme-hint">掃碼包養我 ☕</p>
            </div>
          </div>

          <footer className="about-footer">
            <p>© 2025 廢柴畢業生出品｜純粹興趣製作，歡迎分享</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default About;