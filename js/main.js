const {
  generateIndexes,
  checkExistence,
  addNewImage,
  getSetLength
} = require('./image_generation');

document.addEventListener("DOMContentLoaded", () => {
  // rename based on name of button in html
  const newImageGenerateButton = document.getElementById('generate');

  let viewIdx = 0;

  newImageGenerateButton.addEventListener('click', (e) => {
    // Generate a first set of indexes and convert them to string format
    const { lyricIdx, rowIdx, colIdx } = generateIndexes();
    let stringFormat = `${lyricIdx}-${rowIdx}-${colIdx}`;
    // continue generating until we have a unique combination
    while (checkExistence(stringFormat)) {
      const { lyricIdx, rowIdx, colIdx } = generateIndexes();
      stringFormat = `${lyricIdx}-${rowIdx}-${colIdx}`;
    }
    // Next steps
    // Add new combination to set
    addNewImage(stringFormat)
    // Move to end of image list
    viewIdx = getSetLength();

    drawImage(stringFormat);
    // Image generation
      // Separate code that reads the indexes and displays the proper shia/lyric combination on the screen. This should be done with DOM manipulation on the same elements we use for the title/money hungry button
    // Possible set of instructions or information
      // If this is done, and user can spam the button, only have instructions appear the first time
      // Alt: Instructions never appear, and discrete instruction button flashes
    
  });
  // Event listeners for the right and left buttons to move through the list. Consider simplifying logic with negative and positive indicators
});

// Function to get title?

// Function to draw the image using the indexes previously created
const drawImage = (idxString) => {
  const stringIdxArr = idxString.split('-');
  const [lyricIdx, rowIdx, colIdx] = stringIdxArr.map(Number)
  const container = document.querySelector('.content-image-container');
  const bigImage = new Image();
  bigImage.src = 'images/shia-sprite.png';
  const canvas = document.createElement('canvas');
  canvas.height = 640;
  canvas.width = 360;
  const context = canvas.getContext('2d');
  context.drawImage(bigImage, 0,0);
  // context.beginPath();
  // context.moveTo(0, 0);
  // context.lineTo(18, 36);
  // context.stroke();
  container.classList.remove('hidden');
  container.appendChild(canvas);
  console.log(rowIdx, colIdx)
}
