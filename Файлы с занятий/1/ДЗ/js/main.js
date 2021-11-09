'use strict'

const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://picsum.photos/300/300'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://picsum.photos/300/300'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://picsum.photos/300/300'},
    {id: 4, title: 'Gamepad', price: 50, img: 'https://picsum.photos/300/300'},
];

const renderProduct = (item) => {
    return `<div class="product-item">
                <img src="${item.img}">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="btn buy-btn">Купить</button>
            </div>`
};


const renderPage = list => {
    let markupToProducts = ''
    list.forEach(item => markupToProducts += renderProduct(item));
    document.querySelector('.products').insertAdjacentHTML("afterbegin", markupToProducts);
};

renderPage(products);