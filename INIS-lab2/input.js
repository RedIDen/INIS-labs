const shapeButtons = document.querySelectorAll('.shapeBtn');
const clearButton = document.querySelector('.clearBtn');
const menu = document.querySelector('.menu');
const svg = document.querySelector('svg');

const svgns = "http://www.w3.org/2000/svg";

var drawing;
var indexOfShape = 0;
var selectedButton = document.querySelector('.selectedBtn');
let shape;

var x;
var y;

// Shape buttons
shapeButtons.forEach(x => x.addEventListener('click', () => {
    if (selectedButton != x) {
        selectedButton.classList.remove('selectedBtn');
        x.classList.add('selectedBtn');
        selectedButton = x;
        indexOfShape = Array.prototype.indexOf.call(shapeButtons, x);
        //  console.log(indexOfShape);
    }
}));

// Clear button
clearButton.addEventListener('click', () => {
    let child = svg.lastElementChild;
    while (child) {
        svg.removeChild(child);
        child = svg.lastElementChild;
    }
});

svg.addEventListener('mousedown', (e) => {
    drawing = true;
    x = e.clientX;
    y = e.clientY;
    switch (indexOfShape) {
        case 0: // circle
            shape = document.createElementNS(svgns, "circle");
            shape.setAttribute("cx", e.clientX - menu.clientWidth);
            shape.setAttribute("cy", e.clientY);
            shape.setAttribute("fill", "red");
            svg.appendChild(shape);
            break;
        case 1: // rectangle
            shape = document.createElementNS(svgns, "rect");
            shape.setAttribute("x", e.clientX - menu.clientWidth);
            shape.setAttribute("y", e.clientY);
            shape.setAttribute("fill", "red");
            svg.appendChild(shape);
            break;
    }
})

svg.addEventListener('mousemove', (e) => {
    if (drawing) {
        switch (indexOfShape) {
            case 0: // circle
                let radius = Math.max(e.clientX - x, e.clientY - y) / 2;
                shape.setAttribute("cx", x + radius - menu.clientWidth);
                shape.setAttribute("cy", y + radius);
                shape.setAttribute("r", radius);
                break;
            case 1: // rectangle
                if (e.clientX > x) {
                    shape.setAttribute("width", e.clientX - x);
                } else {
                    shape.setAttribute("x", e.clientX - menu.clientWidth);
                    shape.setAttribute("width", x - e.clientX);
                }

                if (e.clientY > y) {
                    shape.setAttribute("height", e.clientY - y);
                } else {
                    shape.setAttribute("y", e.clientY);
                    shape.setAttribute("height", y - e.clientY);
                }

                break;
        }
    }
})

svg.addEventListener('mouseup', () => {
    drawing = false;
})