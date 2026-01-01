
export const tileCodeMap = {
  '1man' : 1 , '2man': 2, '3man': 3, '4man': 4, '5man': 5,
  '6man': 6, '7man': 7, '8man': 8, '9man': 9,
  '1pin': 11, '2pin': 12, '3pin': 13, '4pin': 14, '5pin': 15,
  '6pin': 16, '7pin': 17, '8pin': 18, '9pin': 19,
  '1sou': 21, '2sou': 22, '3sou': 23, '4sou': 24, '5sou': 25,
  '6sou': 26, '7sou': 27, '8sou': 28, '9sou': 29,
  'east': 30, 'south': 31, 'west': 32, 'north': 33,
  'red': 34, 'green': 35, 'white': 36,
};

export const codeToFile = {
  1: '1man.png', 2: '2man.png', 3: '3man.png', 4: '4man.png', 5: '5man.png',
  6: '6man.png', 7: '7man.png', 8: '8man.png', 9: '9man.png',
  11: '1pin.png', 12: '2pin.png', 13: '3pin.png', 14: '4pin.png', 15: '5pin.png',
  16: '6pin.png', 17: '7pin.png', 18: '8pin.png', 19: '9pin.png',
  21: '1bam.png', 22: '2bam.png', 23: '3bam.png', 24: '4bam.png', 25: '5bam.png',
  26: '6bam.png', 27: '7bam.png', 28: '8bam.png', 29: '9bam.png',
  30: 'east.png', 31: 'south.png', 32: 'west.png', 33: 'north.png',
  34: 'red.png', 35: 'green.png', 36: 'white.png',
};


export function isWinningHand(hands) {
  if (hands.length % 3 !== 2) return false;

  const count = {};
  hands.forEach(t => count[t] = (count[t] || 0) + 1);

  // 枚舉所有可能的將頭（有>=2張的牌）
  for (const tileStr of Object.keys(count)) {
    const tile = Number(tileStr);
    if (count[tile] >= 2) {
      const tempCount = { ...count };
      tempCount[tile] -= 2;

      if (canFormMelds(tempCount)) {
        return true;
      }
    }
  }
  return false;
}

// 遞迴檢查剩下12張是否能完全拆成4組面子
function canFormMelds(count) {
  const totalTiles = Object.values(count).reduce((a, b) => a + b, 0);
  if (totalTiles === 0) return true;
  if (totalTiles % 3 !== 0) return false;

  const working = { ...count };
  const keys = Object.keys(working).map(Number).sort((a, b) => a - b);

  for (const tile of keys) {
    if (working[tile] === 0) continue;

    // 優先拆刻子/槓子
    if (working[tile] >= 3) {
      working[tile] -= 3;
      if (canFormMelds(working)) return true;
      working[tile] += 3; // 回溯
    }

    // 拆順子（只限萬筒條）
    if (tile <= 27 && (tile % 10) <= 7) {
      if ((working[tile + 1] || 0) >= 1 && (working[tile + 2] || 0) >= 1) {
        working[tile]--;
        working[tile + 1]--;
        working[tile + 2]--;
        if (canFormMelds(working)) return true;
        // 回溯
        working[tile]++;
        working[tile + 1]++;
        working[tile + 2]++;
      }
    }
  }
  return false;
}

// 聽牌計算：給任意張數的手牌，找出加哪張能胡
export function getWaitingTiles(hands) {
  const waits = new Set();

  for (let code = 1; code <= 36; code++) {
    // 同牌不能超過4張
    const current = hands.filter(t => t === code).length;
    if (current >= 4) continue;

    const testHand = [...hands, code];
    if (isWinningHand(testHand)) {
      waits.add(code);
    }
  }

  return Array.from(waits).map(code => ({
    code,
    file: codeToFile[code] || 'missing.png',
    name: Object.keys(tileCodeMap).find(k => tileCodeMap[k] === code) || `?${code}`
  }));
}