const { lyrics, saved_images } = require('./content');

const generateIndexes = () => {
  const lyricIdx = Math.floor(Math.random() * lyrics.length);
  const rowIdx = Math.floor(Math.random());
  const colIdx = Math.floor(Math.random() * 10);

  return { lyricIdx, rowIdx, colIdx };
}

const checkExistence = (indexString) => {
  return saved_images.has(indexString);
}

module.exports = {
  generateIndexes,
  checkExistence
}