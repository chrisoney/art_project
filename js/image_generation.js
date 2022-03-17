const { lyrics } = require('./content');
const { getLyric } = require('./content_access');

const generateIndexes = () => {
  const lyricIdx = Math.floor(Math.random() * lyrics.length);
  const rowIdx = Math.floor(Math.random() * 2);
  const colIdx = Math.floor(Math.random() * 10);

  return { lyricIdx, rowIdx, colIdx };
}

// Function to draw the image using the indexes previously created
const drawImage = (idxString) => {
  const container = document.querySelector('.content-image-container');
  if (idxString === null) {
    container.innerHTML = '';
    return;
  }
  const stringIdxArr = idxString.split('-');
  const [lyricIdx, rowIdx, colIdx] = stringIdxArr.map(Number)
  const bigImage = new Image();
  bigImage.crossOrigin = "null";
  bigImage.src = 'https://i.imgur.com/0FWuKsa.png';
  const canvas = document.createElement('canvas');
  canvas.height = 370;
  canvas.width = 144;
  const context = canvas.getContext('2d');
  const WIDTH = 72;
  const HEIGHT = 128;
  const SCALE = 2;
  const lyric = getLyric(lyricIdx);

  // Split the text at a certain number of characters

  bigImage.addEventListener('load', () => {
    context.drawImage(bigImage, colIdx * WIDTH + 1, rowIdx * HEIGHT + 1, WIDTH - 2, HEIGHT - 2, 0, 0, WIDTH * SCALE, HEIGHT * SCALE);
    context.font = 'italic 20px "Fira Sans", serif';
    context.fillStyle = "#A51515";
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
    if (attemptWidth > maxWidth && i > 0) {
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


module.exports = {
  generateIndexes,
  drawImage
}
