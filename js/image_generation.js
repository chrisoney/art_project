const { lyrics, savedImages } = require('./content');

// Only meant to generate indexes.
// LyricIdx will be a line for now. If audio is added, then a start time and duration could be useful
// RowIdx will be the row for the shia sprite. Essentially which direction he faces
// ColIdx will be which stage of movement he's in
// Possible refactor: further randomization with blood splatter?
const generateIndexes = () => {
  const lyricIdx = Math.floor(Math.random() * lyrics.length);
  const rowIdx = Math.floor(Math.random() * 2);
  const colIdx = Math.floor(Math.random() * 10);

  return { lyricIdx, rowIdx, colIdx };
}

// This might be too narrow a purpose, but there's no harm in leaving it as is for now.
const checkExistence = (indexString) => {
  return savedImages.includes(indexString);
}

const addNewImage = (indexString) => {
  savedImages.push(indexString);
}

const getSavedImage = (index) => {
  return savedImages[index]
}

const getSavedImageLength = () => {
  return savedImages.length;
}

const getLyric = (idx) => {
  return lyrics[idx];
}

module.exports = {
  generateIndexes,
  checkExistence,
  addNewImage,
  getSavedImage,
  getSavedImageLength,
  getLyric
}