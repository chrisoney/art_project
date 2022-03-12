const {
  generateIndexes,
  checkExistence,
  addNewImage,
  getSavedImage,
  getSavedImageLength,
  getLyric
} = require('./image_generation');

let viewIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
  // rename based on name of button in html
  const newImageGenerateButton = document.getElementById('generate');


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
    viewIdx = getSavedImageLength();

    drawImage(stringFormat);
    // Image generation
    // Separate code that reads the indexes and displays the proper shia/lyric combination on the screen. This should be done with DOM manipulation on the same elements we use for the title/money hungry button
    // Possible set of instructions or information
    // If this is done, and user can spam the button, only have instructions appear the first time
    // Alt: Instructions never appear, and discrete instruction button flashes
    
  });
  // Event listeners for the right and left buttons to move through the list. Consider simplifying logic with negative and positive indicators
  const rightButton = document.getElementById('right-arrow');
  const leftButton = document.getElementById('left-arrow');

  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateImages(1);
  })
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateImages(-1)
  });
});

// Function to get title?

// Function to draw the image using the indexes previously created
const drawImage = (idxString) => {
  const stringIdxArr = idxString.split('-');
  const [lyricIdx, rowIdx, colIdx] = stringIdxArr.map(Number)
  const container = document.querySelector('.content-image-container');
  const bigImage = new Image();
  bigImage.crossOrigin = "null";
  bigImage.src = 'https://i.imgur.com/0FWuKsa.png';
  const canvas = document.createElement('canvas');
  canvas.height = 400;
  canvas.width = 144;
  const context = canvas.getContext('2d');
  const WIDTH = 72;
  const HEIGHT = 128;
  const SCALE = 2;
  const lyric = getLyric(lyricIdx);

  // Split the text at a certain number of characters

  bigImage.addEventListener('load', () => {
    context.drawImage(bigImage, colIdx * WIDTH, rowIdx * HEIGHT, WIDTH, HEIGHT, 0, 0, WIDTH * SCALE, HEIGHT * SCALE);
    context.font = 'italic 20px "Fira Sans", serif';
    context.fillStyle = "#8a0303";
    splitAndPrintText(lyric, context, 0, 300, 140, 22);
    const newImage = canvas.toDataURL("image/png");
    const imageElement = document.createElement('img')
    imageElement.src = newImage;
    container.innerHTML = '';
    container.appendChild(imageElement);
  })
}

const splitAndPrintText = (lyric, context, x, y, maxWidth, lineHeight) => {
  const words = lyric.split(' ');
  let line = '';

  for (let i = 0; i < words.length; i++) {
    let lineAttempt = line + words[i] + ' ';
    const metrics = context.measureText(lineAttempt);
    const attemptWidth = metrics.width;
    // console.log('width: ', attemptWidth)
    if (attemptWidth > maxWidth && i > 0) {
      // console.log('line: ', line)
      const oldMetrics = context.measureText(line);
      const oldWidth = oldMetrics.width;
      context.fillText(line, (maxWidth - oldWidth) / 2, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = lineAttempt;
    }
  }
  const lastMetrics = context.measureText(line);
  const lastWidth = lastMetrics.width;
  context.fillText(line, (maxWidth - lastWidth) / 2, y);
}

const navigateImages = (direction) => {
  // viewIdx = 0
  const totalImages = getSavedImageLength(); // 1
  viewIdx = (viewIdx + direction) % (totalImages + 1); // 1
  const imageIdx = viewIdx - 1;
  if (imageIdx >= 0 && imageIdx < totalImages) {
    const imageString = getSavedImage(imageIdx); // the 0 index is currently reserved for the main page
    drawImage(imageString)
  } else {
    //main page code
    console.log('out of bounds')
  }
}

const generateTitle = (indexString) => {
  const indexArray = indexString.split('-');
  const [letterIdx, tensDigit, onesDigit] = indexArray.map(Number);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return `${alphabet[letterIdx]}${tensDigit * 10}${onesDigit + 1}`;
}