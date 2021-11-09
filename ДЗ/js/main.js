'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
                this.totalPrice();
        });
        this.render();//вывод товаров на страницу
    }

    _getProducts() {
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    totalPrice() {
        let totalPrice = 0;

        for (let product of this.goods) {
            totalPrice += product.price;
        }        

        console.log(`Общая стоимость товаров: ${totalPrice}`)

    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
        }
        this.btnAddBasket()
    }

    btnAddBasket() {
        const $goods = document.querySelectorAll('.buy-btn')
        $goods.forEach(product => {
            product.addEventListener('click', event => {
                let id = event.currentTarget.parentNode.dataset.id;
                basket.addProductToObject(id, 'add')
                basket.render()
            })
        })
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="btn buy-btn">Купить</button>
            </div>`
    }
}

class Basket {
    constructor(container='.basket__list') {
        this.basket = [];
        this.container = container;
        this._getBasket()
        .then(data => {
            this.basket = data.contents;
            this.render()
        });

        this.viewHideBasket()
        }
        


    addProductToObject(id, move) {
        for (let item of this.basket) {
            if (item.id_product == id) {
                if (move == 'add') {
                    item.quantity += 1
                }
                if (move == 'remove') {
                    item.quantity -= 1
                    if (item.quantity == 0) {
                        this.removeProductToObject(item.id_product)
                    }
                }
                if (move == 'delete') {
                    this.removeProductToObject(item.id_product)
                }
                this.render()
            }
        }
    }

    removeProductToObject(id) {
        let index = this.basket.findIndex(item => item.id_product == id)
        if (index != -1) {
            this.basket.splice(index, 1)
        }
        
    }

    btnRemoveBasket() {
        let $basketItems = document.querySelectorAll('.basket__item_delete')
        $basketItems.forEach(basketItem => {
            basketItem.addEventListener('click', event => {
                let id = event.currentTarget.parentNode.parentNode.dataset.id
                this.addProductToObject(id, 'delete')
            })
        })
    }

    counterAllProduct() {
        // Функция счета количества товара в корзине
    }

    totalBasketPrice() {
        const $block = document.querySelector(this.container);
        let totalPrice = 0;
        
        if (this.basket != 0) {
            for (let item of this.basket) {
                totalPrice += item.price * item.quantity
            }
        }

        const $basket__total = document.querySelector('.basket__total')
        if ($basket__total) {
            $basket__total.remove()
        }
        
        let layout = `
                
                <div class="basket__total">
                    <p class="basket__total_text">Итого <br> к оплате:</p>
                    <p class="basket__total_price">${totalPrice}</p>
                    <button class="btn btn-offer">Заказать</button>
                </div>
        `

        $block.insertAdjacentHTML("beforeend", layout);
        
    }
    

    viewHideBasket() {
        const $btnBasket = document.querySelector('.btn-cart')
        const $basket = document.querySelector('.basket')

        $btnBasket.addEventListener('click', () => {
            $basket.classList.toggle('hidden')
        })
    }

    pressBtnAddQuantity() {
        let $basketItems = document.querySelectorAll('.basket__item_amout-btn')
        $basketItems.forEach(basketItem => {
            basketItem.addEventListener('click', event => {
                let move = event.currentTarget.dataset.value
                let id = event.currentTarget.parentNode.parentNode.parentNode.dataset.id
                this.addProductToObject(id, move)
            })
        })
    }

    render(){
        const $basketList = document.querySelectorAll('.basket__item')
        $basketList.forEach(item => item.remove())


        const block = document.querySelector(this.container);
        for(let product of this.basket){
            const item = new BasketItem(product);
            block.insertAdjacentHTML("afterbegin",item.render());
        }
        this.pressBtnAddQuantity()
        this.totalBasketPrice()
        this.btnRemoveBasket()
    }

    _getBasket() {
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
}

class BasketItem {
    constructor(product,img='https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.quantity = product.quantity
        this.img = img;
    }

    render() {
        return `
        <li class="basket__item" data-id="${this.id}">

            <div class="basket__item_picture">
                <img src="${this.img}" alt="" class="basket__item_img">
            </div>

            <div class="basket__item_info">
                <p class="basket__item_name">${this.title}</p>
                <div class="basket__item_amout">
                    <button class="basket__item_amout-btn" data-value="remove">-</button>
                    <p class="basket__item_amout-text">${this.quantity}</p>
                    <button class="basket__item_amout-btn" data-value="add">+</button>
                </div>
                <p class="basket__item_price">${this.price * this.quantity}</p>
                <button class="basket__item_delete">Удалить</button>
            </div>
    
        </li>
        `
    }
}


let list = new ProductList();
let basket = new Basket();