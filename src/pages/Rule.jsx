import React from 'react';
import './Rule.css';

const Rule = () => {
  return (
    <div className="rule-page">
      <h1 className="main-title">港式麻將規則</h1>

      <div className="rules-grid">

        <div className="rule-card swap-card">
          <h2 className="card-title">換牌規則</h2>
          <ul className="rule-list">
            <li>每局最少換牌 <strong className="highlight">1 次</strong>，上限 <strong className="highlight">3 次</strong></li>
            <li className="sub-item">出現以下情況，加 <strong className="highlight">1 次換牌機會</strong>：
              <ul>
                <li>蛇骰（擲出蛇眼）</li>
                <li>胡牌超過 60 番</li>
                <li>去底或去莊不足 6 番</li>
                <li>連莊</li>
                <li>圍骰</li>
                <li>雙三響</li>
              </ul>
            </li>
            <li className="sub-item">擲骰決定換牌方向：
              <ul>
                <li><strong className="highlight">1、4</strong> → 換給下家</li>
                <li><strong className="highlight">2、5</strong> → 換給對家</li>
                <li><strong className="highlight">3、6</strong> → 換給上家</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="rule-card main-card">
          <h2 className="card-title">其他重要規則</h2>
          <ul className="rule-list">
            <li>拉 <strong className="highlight">3 / 6 / 9 口</strong> 可選擇 <strong className="highlight">投降</strong></li>
            <li>食糊時 <strong className="highlight">斷橋</strong> → 罰企（全付）</li>
            <li><strong className="highlight">小相公</strong>：罰每門一底，可在自己一巡時補尾牌</li>
            <li><strong className="highlight">大相公</strong>：無得救，補牌後不能自摸，必須過水</li>
            <li>自摸時把摸到的牌 <strong className="highlight">拍進手牌</strong> → 無法食糊</li>
            <li>聽牌後 <strong className="highlight">不糊</strong> → 罰企</li>
            <li><strong className="highlight">過水</strong>：聽牌狀態下，放棄食糊，由該牌過到自己手上一巡為止</li>
            <li><strong className="highlight">剷雪 / 破冰</strong> → 踢半（輸家付一半 / 三家各付兩底）</li>
          </ul>
        </div>

        <div className="rule-card penalty-card">
          <h2 className="card-title">罰則一覽</h2>
          <table className="penalty-table">
            <thead>
              <tr>
                <th>情況</th>
                <th>罰則</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>斷橋</td><td>罰企（全付）</td></tr>
              <tr><td>小相公</td><td>每門一底，可補尾牌</td></tr>
              <tr><td>大相公</td><td>不可救，補牌後不可自摸</td></tr>
              <tr><td>聽牌不糊</td><td>罰企</td></tr>
              <tr><td>剷雪/破冰</td><td>踢半</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rule;