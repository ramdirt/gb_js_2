const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        basket: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false,
        isVisibleCart: false
    },
    methods: {
        filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProductCart(product){
            if (this.basket.length == 0) { 
                this.addNewProduct(product)
            } else {
                this.increaseQuantity(product) ? true : this.addNewProduct(product)
            }
        },
        increaseQuantity(product) {
            for (let item of this.basket) {
                if (item.id_product == product.id_product) {
                    return item.quantity++
                }
            }
            return false
        },
        addNewProduct(product) {
            this.basket.push(Object.assign({quantity: 1}, product))
        },
        removeItemCart(product) {
            for (let item of this.basket) {
                if (item.id_product == product.id_product && item.quantity > 1) {
                    return item.quantity--
                } else if (item.quantity === 1) {
                    const idx = this.basket.findIndex(product => product.id_product === item.id_product)
                    this.basket.splice(idx, 1)
                }
            }
        },


        viewHide(product) {
            if (this.filtered.length != 0) {
                return this.filtered.includes(product)
            } else {
                return true
            }
            
        }
    },
    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
})