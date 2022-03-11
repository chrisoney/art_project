import { lyrics } from './lyrics';

document.addEventListener("DOMContentLoaded", () => {
  const newImageGenerateButton = document.getElementById('generate');

  newImageGenerateButton.addEventListener('click', (e) => {
    const randomLyricIndex = Math.floor(Math.random() * lyrics.length);
    const rowIndex = Math.floor(Math.random());
    const columnIndex = Math.floor(Math.random() * 10);

    console.log(randomLyricIndex, rowIndex, columnIndex);
  });
});

