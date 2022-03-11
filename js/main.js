const { generateIndexes, checkExistence } = require('./image_generation');

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
    // Move to end of image list
    // Image generation
      // Separate code that reads the indexes and displays the proper shia/lyric combination on the screen. This should be done with DOM manipulation on the same elements we use for the title/money hungry button
    // Possible set of instructions or information
      // If this is done, and user can spam the button, only have instructions appear the first time
      // Alt: Instructions never appear, and discrete instruction button flashes
    
  });
  // Event listeners for the right and left buttons to move through the list. Consider simplifying logic with negative and positive indicators
});

