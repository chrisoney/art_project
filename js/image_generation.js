const { lyrics } = require('./lyrics');

const generateIndexes = () => {
  const lyricIdx = Math.floor(Math.random() * lyrics.length);
  const rowIdx = Math.floor(Math.random());
  const colIdx = Math.floor(Math.random() * 10);

  return { lyricIdx, rowIdx, colIdx };
}

module.exports = {
  generateIndexes
}