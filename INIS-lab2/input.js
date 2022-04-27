
let targets = document.querySelectorAll('.target');
let selected = null;
let captured = null;
let resized = null;

let moved = false;
let escaped = false;
let dbclicked = false;
let dbtapped = false;
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
        if (!dbtapped) {
            moveElement(e.touches[0]);
        }
        else {
            resize(e);
        }
    });

    document.addEventListener('touchend', () => {
        if (!moved) {
            captured = null;
        }
    });

    document.addEventListener('touchstart', (e) => {
        mouse = false;
        switch (e.touches.length) {
            case 2:
                cancel();
                break;
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
                        }, 200)

                        dbtapped = false;
                        moved = false;
                        if (captured == null) {
                            downElement(element, e.touches[0]);
                        }
                    }
                    else {
                        clearTimeout(clickTimer);
                        clickTimer = null;
                        captureElement(element, e.touches[0]);
                        dbclicked = true;
                    }
                    break;
                case 2:
                    if (clickTimer != null) {
                        clearTimeout(clickTimer);
                        clickTimer = null;
                        dbtapped = true;
                        resized = element;
                        touchElement(element, e);
                        resize(e);
                        e.stopPropagation();
                    }
                    break;
                case 3:
                    if (clickTimer != null) {
                        dbtapped = true;
                        e.stopPropagation();
                    }
                    break;
            }
        });

        element.addEventListener('touchend', (e) => {
            mouse = false;
            switch (e.touches.length) {
                case 0:
                    if (captured != null && !dbclicked) {
                        captured = null;
                    }

                    if (!dbtapped) {
                        touchElement(element, e);
                    }

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
        dbclicked = false;
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

function resize(e) {

    captured.style.left = (e.touches[0].clientX + deltaX) + 'px';
    captured.style.top = (e.touches[1].clientY + deltaY) + 'px';

    // let width = Math.abs(e.touches[0].clientX, e.touches[1].clientX);
    // let koef = width / resized.style.width;

    // resized.style.width = resized.style.width * koef + 'px';
}