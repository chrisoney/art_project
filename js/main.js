const { generateIndexes } = require('./image_generation');

document.addEventListener("DOMContentLoaded", () => {
  const newImageGenerateButton = document.getElementById('generate');

  newImageGenerateButton.addEventListener('click', (e) => {
    const { lyricIdx, rowIdx, colIdx } = generateIndexes();
    let stringFormat = `${lyricIdx}-${rowIdx}-${colIdx}`;
    while (checkExistence(stringFormat)) {
      const { lyricIdx, rowIdx, colIdx } = generateIndexes();
      stringFormat = `${lyricIdx}-${rowIdx}-${colIdx}`;
    }
  });
});

