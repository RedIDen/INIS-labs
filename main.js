// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    const container = document.querySelector('.imageContainer');
    shirts.forEach(x => {
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
        let coutOfColors = countColors(x);
        let many = coutOfColors == 1 ? '' : 's';
        p.innerHTML = `Available in ${coutOfColors} color${many}`
        div.append(p);

        let buttons = document.createElement('div');
        buttons.classList.add('buttonsItem');

        let buttonQuickView = document.createElement('button');
        buttonQuickView.innerHTML = 'Quick View';
        buttonQuickView.classList.add('buttonItem');
        buttonQuickView.addEventListener('click', () => {
            showQuickView(x);
        });
        buttons.append(buttonQuickView);

        let buttonSeePage = document.createElement('button');
        buttonSeePage.innerHTML = 'See Page';
        buttonSeePage.classList.add('buttonItem');
        buttonSeePage.addEventListener('click', () => {
            initDetails(x);
        });
        buttons.append(buttonSeePage);

        div.append(buttons);

        container.append(div);
    });
};

let countColors = (x) => {
    let result = 0;
    for (let e in x.colors) {

        result++;
    }

    return result;
};

let initDetails = (x) => {
    window.location = 'details.html';
};

let navClick = (link) => {
    window.location = link;
};

let showQuickView = (x) => {
    const container = document.querySelector('.quickViewContainer');

    clearQuickView(container);

    let imageContent = document.createElement('div');

    let frontImg = document.createElement('img');
    frontImg.classList.add('imgQuickView');
    frontImg.src = `${x.colors.white.front}`;
    frontImg.alt = "Front View";
    imageContent.append(frontImg);

    let backImg = document.createElement('img');
    backImg.classList.add('imgQuickView');
    backImg.src = `${x.colors.white.back}`;
    backImg.alt = "Back View";
    imageContent.append(backImg);

    container.append(imageContent);

    let content = document.createElement('div');

    let tShirtName = document.createElement('p');
    tShirtName.classList.add('name');
    tShirtName.innerHTML = `${x.name}`;

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerHTML = `${x.price}`;

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