let initProducts = () => {
    const container = document.querySelector('.imageContainer');
    for (let i = 0; i < shirts.length; i++) {
        let x = shirts[i];
        let div = document.createElement('div');
        div.classList.add('tshirtContainer');

        let img = document.createElement('img');
        img.classList.add('imgItem');
        img.src = `${x.colors.white.front}`;
        img.alt = "Image";
        div.append(img);

        let h3 = document.createElement('h3');
        h3.classList.add('h3Item');
        h3.innerHTML = `${x.name}`;
        div.append(h3);

        let p = document.createElement('p');
        p.classList.add("pItem");
        localStorage.setItem('shirtIndex', i);
        let coutOfColors = countColors();
        let many = coutOfColors == 1 ? '' : 's';
        p.innerHTML = `Available in ${coutOfColors} color${many}`
        div.append(p);

        let buttons = document.createElement('div');
        buttons.classList.add('buttonsItem');

        let buttonQuickView = document.createElement('button');
        buttonQuickView.innerHTML = 'Quick View';
        buttonQuickView.classList.add('buttonItem');
        buttonQuickView.addEventListener('click', () => {
            localStorage.setItem('shirtIndex', i);
            showQuickView();
        });
        buttons.append(buttonQuickView);

        let buttonSeePage = document.createElement('button');
        buttonSeePage.innerHTML = 'See Page';
        buttonSeePage.classList.add('buttonItem');
        buttonSeePage.addEventListener('click', () => {
            window.location = '/details.html';
            localStorage.setItem('shirtIndex', i);
        });
        buttons.append(buttonSeePage);

        div.append(buttons);

        container.append(div);
    }
};

let countColors = () => {
    let shirt = shirts[localStorage.getItem('shirtIndex')];
    let result = 0;
    for (let e in shirt.colors) {
        result++;
    }

    return result;
};

let initDetails = () => {
    let side = 'front';
    let activeColor = 'white';
    let shirtName = document.querySelector('.shirtTitle');
    let detailImage = document.querySelector('.shirtImage');
    let shirtInfo = document.querySelector('.shirtInfo');
    let shirtPrice = document.querySelector('.shirtPrice');
    let shirtDescription = document.querySelector('.shirtDescription');
    let frontSideBtn = document.querySelector('.frontSideButton');
    let backSideBtn = document.querySelector('.backSideButton');
    let shirtColors = document.querySelector('.shirtColors');

    let shirt = shirts[localStorage.getItem('shirtIndex')];
    const image = new Image();
    shirtName.textContent = shirt.name;

    image.src = `${shirt.colors[Object.keys(shirt.colors)[0]].front}`;
    detailImage.style.backgroundImage = '';
    detailImage.append(image);

    shirtDescription.textContent = `${shirt.description}`
    shirtInfo.prepend(shirtDescription);

    shirtPrice.textContent = `${shirt.price}`;
    shirtInfo.prepend(shirtPrice);

    for (let i = 0; i < Object.keys(shirt.colors).length; i++) {
        let colorBtn = document.createElement('button');
        colorBtn.classList.add('colorButton');
        if (i == 0) {
            colorBtn.classList.add('active');
        }
        colorBtn.textContent = Object.keys(shirt.colors)[i];
        colorBtn.style.backgroundColor = Object.keys(shirt.colors)[i];
        shirtColors.append(colorBtn);
    }
    const colorBtns = document.querySelectorAll('.colorButton');
    frontSideBtn.addEventListener('click', e => {
        backSideBtn.classList.remove('active');
        frontSideBtn.classList.add('active');
        swipeSide(shirt, 'front');
        side = 'front';
    });
    backSideBtn.addEventListener('click', e => {
        frontSideBtn.classList.remove('active');
        backSideBtn.classList.add('active');
        swipeSide(shirt, 'back');
        side = 'back';
    });
    shirtColors.addEventListener('click', e => {
        if (e.target.className == 'colorButton') {
            colorBtns.forEach((element) => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                }
            })
            e.target.classList.add('active');
            activeColor = e.target.textContent;
            swipeSide(shirt, side);
        }
        else {
            return;
        }
    });
    function swipeSide(shirt, side) {
        image.src = `${shirt.colors[activeColor][side]}`;
        detailImage.style.backgroundImage = '';
        detailImage.append(image);
    }
};

let navClick = (link) => {
    window.location = link;
};

let showQuickView = () => {
    let shirt = shirts[localStorage.getItem('shirtIndex')];
    const container = document.querySelector('.quickViewContainer');
    console.log(shirt);
    clearQuickView(container);

    let imageContent = document.createElement('div');

    let frontImg = document.createElement('img');
    frontImg.classList.add('imgQuickView');
    frontImg.src = `${shirt.colors.white.front}`;
    frontImg.alt = "Front View";
    imageContent.append(frontImg);

    let backImg = document.createElement('img');
    backImg.classList.add('imgQuickView');
    backImg.src = `${shirt.colors.white.back}`;
    backImg.alt = "Back View";
    imageContent.append(backImg);

    container.append(imageContent);

    let content = document.createElement('div');

    let tShirtName = document.createElement('p');
    tShirtName.classList.add('name');
    tShirtName.innerHTML = `${shirt.name}`;

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerHTML = `${shirt.price}`;

    let button = document.createElement('button');
    button.innerHTML = 'Close';
    button.classList.add('button');
    button.addEventListener('click', () => {
        clearQuickView(container);
    });

    content.append(tShirtName);
    content.append(price);
    content.append(button);

    container.append(content);
};

let clearQuickView = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};