'use strict'

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.totalPrice();
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    totalPrice() {
        let totalPrice = 0;

        for (let product of this.goods) {
            totalPrice += product.price;
        }
        
        // this.goods.forEach(item => totalPrice += item.price)

        // for (let i = 0; i < this.goods.length; i++) {
        //     totalPrice += this.goods[i].price;
        // }

        console.log(`Общая стоимость товаров: ${totalPrice}`)

    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//           block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="btn buy-btn">Купить</button>
            </div>`
    }
}

class Basket {
    constructor() {
        this.basket = [];
    }

    addProductToObject() {
        // Функция добавления товара в корзину
    }

    removeProductToObject() {
        // Функция удаления товара из корзины
    }

    counterAllProduct() {
        // Функция счета количества товара в корзине
    }

    TotalBasketPrice() {
        // Функция подсчета общий стоимости корзины
    }

    render() {
        // Функция рендера корзины
    }
}

class BasketItem {
    constructor() {
        this.count;
        this.price;
    }

    layout() {
        // Верстка для товара в корзине
    }
}


let list = new ProductList();



// const products = [
//     {id: 1, title: 'Notebook', price: 2000, img: 'https://picsum.photos/300/300'},
//     {id: 2, title: 'Mouse', price: 20, img: 'https://picsum.photos/300/300'},
//     {id: 3, title: 'Keyboard', price: 200, img: 'https://picsum.photos/300/300'},
//     {id: 4, title: 'Gamepad', price: 50, img: 'https://picsum.photos/300/300'},
// ];

// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <img src="${item.img}">
//                 <h3>${item.title}</h3>
//                 <p>${item.price}</p>
//                 <button class="btn buy-btn">Купить</button>
//             </div>`
// };


// const renderPage = list => {
//     let markupToProducts = ''
//     list.forEach(item => markupToProducts += renderProduct(item));
//     document.querySelector('.products').insertAdjacentHTML("afterbegin", markupToProducts);
// };

// renderPage(products);