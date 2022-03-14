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
    navigateImages(viewIdx - 1)    
  });
  // Event listeners for the right and left buttons to move through the list. Consider simplifying logic with negative and positive indicators
  const rightButton = document.getElementById('right-arrow');
  const leftButton = document.getElementById('left-arrow');
  const homeButtom = document.getElementById('home');

  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    findIndex(1);
    navigateImages();
  })
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    findIndex(-1)
    navigateImages()
  });
  homeButtom.addEventListener('click', (e) => {
    e.preventDefault();
    viewIdx = 0;
    navigateImages()
  })

  const linkReveal = document.querySelector('.link-reveal');
  linkReveal.addEventListener('click', (e) => {
    e.preventDefault();
    const links = document.querySelectorAll('.outside-link');
    links.forEach((ele) => ele.classList.toggle('revealed'));
  });

  const settingsReveal = document.querySelector('.settings-reveal');
  settingsReveal.addEventListener('click', (e) => {
    e.preventDefault();
    const settingsButtons = document.querySelectorAll('.settings-button');
    settingsButtons.forEach((ele) => ele.classList.toggle('revealed'));
    const volume = document.getElementById('volume-slider');
    volume.classList.toggle('revealed');
  })

  const darkmodeBUtton = document.getElementById('darkmode');
  darkmodeBUtton.addEventListener('click', (e) => {
    e.preventDefault();
    const darkmodeElements = document.querySelectorAll('.darkmode-capable');
    darkmodeElements.forEach((ele) => {
      ele.classList.toggle('darkmode')
    })
  })

  // Audio event listeners
  const audio = document.getElementById("audio");

  const mainMusicButton = document.getElementById('music');
  mainMusicButton.addEventListener("click", (e) => {
    e.preventDefault();
    const slash = document.querySelector('.music-slash');
    slash.classList.toggle('hidden');
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  const infoModalToggleButton = document.getElementById('info');
  infoModalToggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('modal');
    modal.classList.toggle('hidden');
  })

  const volumeSlider = document.getElementById('volume-slider');
  volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    audio.volume = value / 100;
  });
});

// Function to get title?

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

const findIndex = (direction) => {
  const totalImages = getSavedImageLength();
  let movement = viewIdx + direction;
  if (movement < 0) movement = totalImages;
  viewIdx = (movement) % (totalImages + 1);
}

const navigateImages = () => {
  if (viewIdx > 0) {
    const imageString = getSavedImage(viewIdx - 1);
    const title = generateImageTitle(imageString)
    populatePage(title, imageString, false)
  } else {
    populatePage('Shia Art', null, true)
  }
}

const generateImageTitle = (indexString) => {
  const indexArray = indexString.split('-');
  const [number, charTensDigit, charOnesDigit] = indexArray.map(Number);
  const letterIdx = charTensDigit * 10 + charOnesDigit + 1;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return `${alphabet[letterIdx]}${number}`;
}

const populatePage = (title, imageString, homePage) => {
  const titleElement = document.getElementById("title");
  titleElement.innerText = title;
  drawImage(imageString)

  const generateButton = document.getElementById("generate");
  const homeButton = document.getElementById("home");
  if (homePage) {
    if (generateButton.classList.contains("hidden")) {
      generateButton.classList.remove("hidden")
    }
    if (!home.classList.contains("hidden")) {
      home.classList.add("hidden")
    }
  } else {
    if (!generateButton.classList.contains("hidden")) {
      generateButton.classList.add("hidden");
    }
    if (homeButton.classList.contains("hidden")) {
      homeButton.classList.remove("hidden");
    }
  }
}