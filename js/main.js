const {
  checkExistence,
  addNewImage,
  getSavedImageLength,
  getLink,
} = require('./content_access');

const {
  generateIndexes,
} = require('./image_generation');

const { navigateImages } = require('./display')

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
    navigateImages(viewIdx) // Fixed index issue, return later
  });
  // Event listeners for the right and left buttons to move through the list. Consider simplifying logic with negative and positive indicators
  const rightButton = document.getElementById('right-arrow');
  const leftButton = document.getElementById('left-arrow');
  const homeButtom = document.getElementById('home');

  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    findIndex(1);
    navigateImages(viewIdx);
  })
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    findIndex(-1)
    navigateImages(viewIdx)
  });
  homeButtom.addEventListener('click', (e) => {
    e.preventDefault();
    viewIdx = 0;
    navigateImages(viewIdx)
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

  const volumeSlider = document.getElementById('volume-slider');
  volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;

    audio.volume = value / 100;
  });

  // Modal event listeners

  const toggleModal = (e) => {
    if (e.target !== e.currentTarget && !e.target.classList.contains('toggle-modal')) return;
    const modalBackground = document.querySelector('.modal-background');
    modalBackground.classList.toggle('hidden');
  };

  const infoModalToggleButton = document.getElementById('info');
  infoModalToggleButton.addEventListener('click', (e) => toggleModal(e));
  const modalBackground = document.querySelector('.modal-background');
  modalBackground.addEventListener('click', (e) => toggleModal(e));

  // Link event listeners for modal
  const externalLinks = document.querySelectorAll('.external-link');
  externalLinks.forEach((ele) => ele.addEventListener('click', (e) => {
    e.preventDefault();
    const linkName = e.currentTarget.dataset.linkName;
    const linkUrl = getLink(linkName);
    window.open(linkUrl, '_blank')
  }))
});

const findIndex = (direction) => {
  const totalImages = getSavedImageLength();
  let movement = viewIdx + direction;
  if (movement < 0) movement = totalImages;
  viewIdx = (movement) % (totalImages + 1);
}