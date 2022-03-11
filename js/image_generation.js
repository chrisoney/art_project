const { lyrics, saved_images } = require('./content');

// Only meant to generate indexes.
// LyricIdx will be a line for now. If audio is added, then a start time and duration could be useful
// RowIdx will be the row for the shia sprite. Essentially which direction he faces
// ColIdx will be which stage of movement he's in
// Possible refactor: further randomization with blood splatter?
const generateIndexes = () => {
  const lyricIdx = Math.floor(Math.random() * lyrics.length);
  const rowIdx = Math.floor(Math.random());
  const colIdx = Math.floor(Math.random() * 10);

  return { lyricIdx, rowIdx, colIdx };
}

// This might be too narrow a purpose, but there's no harm in leaving it as is for now.
const checkExistence = (indexString) => {
  return saved_images.includes(indexString);
}

const addNewImage = (indexString) => {
  saved_images.push(indexString);
}

const getSetLength = () => {
  return saved_images.length;
}

module.exports = {
  generateIndexes,
  checkExistence,
  addNewImage,
  getSetLength
}