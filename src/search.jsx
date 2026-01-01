import React, { useState, useMemo } from 'react';
import data from '../mahjong.json';
import './search.css';

function SearchableTable() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  return (
    <div className="table-container">
      <input
        className="search-box"
        type="text"
        placeholder="搜尋花式、番數或描述..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <div className="table-wrapper">
        <table className="mahjong-table">
          <thead>
            <tr>
              <th className="set">花式</th>
              <th className="point">番數</th>
              <th className="description">描述</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="points">{item.points}</td>
               <td className="description-cell">
  <div className="description-content">
    {item.images && item.images.length > 0 ? (
      <>
        {/* 圖片區 - 獨立一行 */}
        <div className="images-grid">
          {item.images.map((imgName, index) => {
            if (typeof imgName === 'string' && imgName.startsWith('text:')) {
              return <span key={index} className="interspersed-text">{imgName.slice(5)}</span>;
            }
            return (
              <img
                key={index}
                src={`/mahjong_page/assets/tiles/${imgName}`}
                alt={imgName}
                className="tile-image"
                onError={(e) => {
                  console.error(`圖片載入失敗: ${imgName}`);
                  e.target.style.display = 'none';
                }}
              />
            );
          })}
        </div>

        <div className="image-description">
          {item.descriptions}
        </div>
      </>
    ) : (
      <div className="image-description">
        {item.descriptions || ''}
      </div>
    )}
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredData.length === 0 && searchTerm && (
        <p className="no-results">沒有找到「{searchTerm}」的結果</p>
      )}
    </div>
  );
}

export default SearchableTable;