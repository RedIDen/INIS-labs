// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    const container = document.querySelector('.imageContainer');
    shirts.forEach(x => {
        let div = document.createElement('div');
        div.classList.add('tshirtContainer');

        let img = new Image();
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

        buttons.append(buttonQuickView);

        let buttonSeePage = document.createElement('button');
        buttonSeePage.innerHTML = 'See Page';
        buttonSeePage.classList.add('buttonItem');
        buttonSeePage.addEventListener('click', () => {
            initDetails(x);
        });
        buttons.append(buttonSeePage);

        div.append(buttons);

        //   div.addEventListener('mouseenter', () => {
        //       initDetails(x);
        //   })

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
    document.location.href = 'details.html';
};

let navClick = (link) => {
    document.location.href = link;
};