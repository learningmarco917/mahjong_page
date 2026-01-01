import React, { useState } from 'react';
import {
  tileCodeMap,
  codeToFile,
  isWinningHand,
  getWaitingTiles,
} from '../utils/mahjongCalculator';
import './Cal.css';

function Calculator() {
  const [mainHand, setMainHand] = useState({});
  const [showWaiting, setShowWaiting] = useState(false);

  const handCount = Object.values(mainHand).reduce((a, b) => a + b, 0);

  const mainTilesArray = [];
  Object.entries(mainHand).forEach(([name, cnt]) => {
    const code = tileCodeMap[name];
    if (code) {
      for (let i = 0; i < cnt; i++) mainTilesArray.push(code);
    }
  });

  const isWinning = isWinningHand(mainTilesArray);
  const waitingTiles = getWaitingTiles(mainTilesArray);
  const canListen = waitingTiles.length > 0 && !isWinning;

  const addTile = (tileName) => {
    setMainHand(prev => {
      const current = prev[tileName] || 0;
      if (current >= 4) return prev;
      const newHand = { ...prev, [tileName]: current + 1 };
      const total = Object.values(newHand).reduce((a, b) => a + b, 0);
      if (total > 17) return prev;
      return newHand;
    });
    setShowWaiting(false);
  };

  const removeTile = (tileName) => {
    setMainHand(prev => {
      const current = prev[tileName] || 0;
      if (current <= 1) {
        const newHand = { ...prev };
        delete newHand[tileName];
        return newHand;
      }
      return { ...prev, [tileName]: current - 1 };
    });
    setShowWaiting(false);
  };

  const sortedSelectedTiles = Object.keys(mainHand)
    .sort((a, b) => tileCodeMap[a] - tileCodeMap[b])
    .flatMap(name => Array(mainHand[name]).fill(name));

  const toggleWaitingDisplay = () => {
    setShowWaiting(prev => !prev);
  };

  return (
    <div className="calculator">
      <div className="selected-hand">
        <div className="selected-header">
          <span>（{handCount}張手牌）點擊可移除</span>
          {canListen && (
        <div className="listen-button-container">
          <button
            className="listen-toggle-btn"
            onClick={toggleWaitingDisplay}
          >
            {showWaiting ? '隱藏' : `聽牌`}
          </button>
        </div>
      )}
          <button onClick={() => { setMainHand({}); setShowWaiting(false); }} className="reset-btn">
            清空
          </button>
        </div>
        {showWaiting && canListen && (
        <div className="waiting-section">
          <div className="waiting-tiles-large">聽：
            {waitingTiles.map(t => (
              <img
                key={t.code}
                src={`/mahjong_page/assets/tiles/${t.file}`}
                alt={t.name}
                className="waiting-tile"
              />
            ))}
          </div>
        </div>
      )}
        <div className="selected-tiles">     
          {sortedSelectedTiles.length === 0 ? (
            <p className="empty-hand">尚未選擇任何牌</p>
          ) : (
            sortedSelectedTiles.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="selected-tile"
                onClick={() => removeTile(name)}
              >
                <img
                  src={`/mahjong_page/assets/tiles/${codeToFile[tileCodeMap[name]]}`}
                  alt={name}
                />
                
              </div>
            ))
          )}
        </div>
      </div>
      
      

      {handCount === 17 && !isWinning && !canListen && (
        <p style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
          ❌ 17張但無法胡牌
        </p>
      )}
      {handCount > 17 && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          手牌超過17張，請調整
        </p>
      )}

      <div className="tile-pool">
        <div className="tile-grid">
          {Object.keys(tileCodeMap).map(name => (
            <div
              key={name}
              className={`tile-btn ${mainHand[name] > 0 ? 'active' : ''}`}
              onClick={() => addTile(name)}
            >
              <img
                src={`/mahjong_page/assets/tiles/${codeToFile[tileCodeMap[name]]}`}
                alt={name}
              />
            </div>
          ))}
        </div>
      </div>
      {isWinning && (
        <div className="win-section">
          <p className="win">✅ 已食糊！</p>
        </div>
      )}
    </div>
  );
}

export default Calculator;