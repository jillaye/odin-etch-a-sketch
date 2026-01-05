// File constants
const container = document.querySelector('#container');
const sizeButton = document.getElementById('sizeButton');
const closeButton = document.getElementById('closeButton');
const eraseButton = document.getElementById('eraseOrDraw');
const colorButton = document.getElementById('colorButton');
const dialog = document.querySelector('dialog');
const input = document.getElementById('numSquares');
const minSquares = 2;
const maxSquares = 100;
const defaultSquares = 16;
const totalLength = 520;
let squaresPerSide = defaultSquares;

// buildGrid creates a square grid with squaresPerSide squares per side 
function buildGrid() {
    for (let x = 0; x < squaresPerSide; x++) {
        // figure out why this seems backwards!!!
        let column = document.createElement("div");
        for (let y = 0; y < squaresPerSide; y++) {
            let square = document.createElement("div");
            square.classList.add("square");
            column.appendChild(square);
        }
         container.appendChild(column);
    }
}

// addEventListeners adds event listeners for each square in the grid that change its
// color to the latest square color when moused over.
function addEventListeners() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseover', function(e) {
            square.style.background = getColor();
        });
    });
}

function setSquareDimensions() {
    const squares = document.querySelectorAll('.square');
    const sideLength = totalLength/squaresPerSide;
    squares.forEach(square => {
        square.style.height = sideLength + 'px';
        square.style.width = sideLength + 'px';
    })
}

function createNewGrid() {
    buildGrid();
    setSquareDimensions();
    addEventListeners();
    eraseButton.textContent = "Change to Erase";
    colorButton.textContent = "Switch to Multicolor";
    getColor = () => {
        return "blue";
    }
}

// Event listener to show the change grid size dialog
sizeButton.addEventListener('click', () => {
    dialog.showModal();
});

// Event listener for change grid size dialog close button. Deletes the old grid,
// set the new side length and recreates a new grid with the new side length.
closeButton.addEventListener('click', () => {
    const value = Number(input.value);
    // Validate min/max
    squaresPerSide = (value >= minSquares && value <= maxSquares) ? value : defaultSquares;
    dialog.close();
    container.replaceChildren();
    createNewGrid();
});

// Event listener for the erase/draw button. Toggles button text and
// "drawing" color btwn blue (draw) and white (erase)
eraseButton.addEventListener('click', () => {
    if (eraseButton.textContent === "Change to Erase") {
        eraseButton.textContent = "Change to Draw";
        getColor = () => {
            return "white";
        }
    } else if (eraseButton.textContent === "Change to Draw") {
        eraseButton.textContent = "Change to Erase";
    }
});

// Event listener for the multi color / solid color button. Toggles button text and
// "drawing" color btwn blue and random color.
colorButton.addEventListener('click', () => {
    if (colorButton.textContent === "Switch to Multicolor") {
        colorButton.textContent = "Switch to Solid Color";
        getColor = getRandomColor;
    } else if (colorButton.textContent === "Switch to Solid Color") {
        colorButton.textContent = "Switch to Multicolor";
        getColor = () => {
            return "blue";
        }
    }
});

function getRandomColor() {
    return  "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " +
        Math.floor(Math.random() * 256) + ")";
}

let getColor = () => {
    return "blue";
}
createNewGrid()
