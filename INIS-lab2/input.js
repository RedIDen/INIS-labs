const shapeButtons = document.querySelectorAll('.shapeBtn');
const colorButtons = document.querySelectorAll('.colorBtn');
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
var color = "red";

shapeButtons.forEach(x => x.addEventListener('click', () => {
    if (selectedButton != x) {
        selectedButton.style.backgroundColor = "gainsboro";
        selectedButton.classList.remove('selectedBtn');
        x.classList.add('selectedBtn');
        x.style.backgroundColor = color;
        selectedButton = x;
        indexOfShape = Array.prototype.indexOf.call(shapeButtons, x);
    }
}));

colorButtons.forEach(x => x.addEventListener('click', () => {
    color = x.style.backgroundColor;
    selectedButton.style.backgroundColor = color;
    console.log(color);
}));

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
            shape = document.createElementNS(svgns, "ellipse");
            shape.setAttribute("cx", e.clientX - menu.clientWidth);
            shape.setAttribute("cy", e.clientY);
            shape.setAttribute("fill", color);
            svg.appendChild(shape);
            break;
        case 1: // rectangle
            shape = document.createElementNS(svgns, "rect");
            shape.setAttribute("x", e.clientX - menu.clientWidth);
            shape.setAttribute("y", e.clientY);
            shape.setAttribute("fill", color);
            svg.appendChild(shape);
            break;
    }
})

svg.addEventListener('mousemove', (e) => {
    if (drawing) {
        switch (indexOfShape) {
            case 0: // circle
                let radiusX = (e.clientX - x) / 2;
                let radiusY = (e.clientY - y) / 2;
                // shape.setAttribute("cx", x + radius - menu.clientWidth);
                // shape.setAttribute("cy", y + radius);
                // shape.setAttribute("r", radius);
                if (e.clientX > x) {
                    shape.setAttribute("rx", radiusX);
                    shape.setAttribute("cx", x + radiusX - menu.clientWidth);
                } else {
                    shape.setAttribute("rx", -radiusX);
                    shape.setAttribute("cx", x + radiusX - menu.clientWidth);
                }

                if (e.clientY > y) {
                    shape.setAttribute("ry", radiusY);
                    shape.setAttribute("cy", y + radiusY);
                } else {
                    shape.setAttribute("ry", -radiusY);
                    shape.setAttribute("cy", y + radiusY);
                }
                break;
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

svg.addEventListener('mouseleave', () => {
    drawing = false;
})