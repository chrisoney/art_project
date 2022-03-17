const { getSavedImage } = require('./content_access')
const { drawImage } = require('./image_generation');

const navigateImages = (viewIdx) => {
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


module.exports = {
  navigateImages
}