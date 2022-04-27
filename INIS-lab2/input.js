
let targets = document.querySelectorAll('.target');
let selected = null;
let captured = null;

let moved = false;
let escaped = false;
let dbclicked = false;
let mouse = true;

let deltaX;
let deltaY;

let startX;
let startY;

let clickTimer = null;

function subscribe() {

    // clicks --------------------------------------------

    document.addEventListener('click', () => {
        touchBackgroung();
    });

    document.addEventListener('mousemove', (e) => {
        if (mouse) {
            moveElement(e);
        }
    });

    document.addEventListener('mouseup', () => {
        dbclicked = false;
        captured = null;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            cancel();
            escaped = !dbclicked;
        }
    });

    // touches -----------------------------------------------

    document.addEventListener('touchmove', (e) => {
        moveElement(e.touches[0]);
    });

    document.addEventListener('touchend', () => {
        if (!moved) {
            captured = null;
        }
    });

    targets.forEach(element => {

        // clicks -------------------------------------------------

        element.addEventListener('click', (e) => {
            touchElement(element, e);
        });

        element.addEventListener('mousedown', (e) => {
            downElement(element, e);
        });

        element.addEventListener('dblclick', (e) => {
            dbclicked = true;
            captureElement(element, e);
        });

        // touches --------------------------------------------------

        element.addEventListener('touchstart', (e) => {
            mouse = false;
            switch (e.touches.length) {
                case 1:
                    if (clickTimer == null) {
                        clickTimer = setTimeout(function () {
                            clickTimer = null;
                        }, 500)

                        moved = false;
                        if (captured == null) {
                            touchElement(element, e);
                        }
                    }
                    else {
                        clearTimeout(clickTimer);
                        clickTimer = null;
                        captureElement(element, e.touches[0]);
                    }
                    break;
                case 2:
                    cancel();
                    break;
                case 3:
                    break;
            }
        });

    });
}

subscribe();

function captureElement(element, e) {
    startX = element.offsetLeft;
    startY = element.offsetTop;
    deltaX = element.offsetLeft - e.clientX;
    deltaY = element.offsetTop - e.clientY;
    captured = element;
}

function touchElement(element, e) {
    if (!moved) {
        if (selected != null) {
            selected.classList.remove('selected');
        }

        selected = element;
        selected.classList.add('selected');
    }

    e.stopPropagation(); // to awoid firing document.onclick
}

function touchBackgroung() {
    if (!escaped) {
        if (selected != null) {
            selected.classList.remove('selected');
            selected = null;
        }
    }

    escaped = false;
}

function downElement(element, e) {
    if (captured == null) {
        captureElement(element, e);
        moved = false;
    }
}

function moveElement(e) {
    console.log("move")
    if (captured != null) {
        captured.style.left = (e.clientX + deltaX) + 'px';
        captured.style.top = (e.clientY + deltaY) + 'px';
        moved = true;
    }
}

function cancel() {
    if (captured != null) {
        captured.style.left = startX + 'px';
        captured.style.top = startY + 'px';
        captured = null;
    }
}