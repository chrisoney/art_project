const { generateIndexes } = require('./image_generation');

document.addEventListener("DOMContentLoaded", () => {
  const newImageGenerateButton = document.getElementById('generate');

  newImageGenerateButton.addEventListener('click', (e) => {
    const { lyricIdx, rowIdx, colIdx } = generateIndexes();
  });
});

