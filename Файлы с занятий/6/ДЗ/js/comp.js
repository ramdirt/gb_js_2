Vue.component('products', {
    props: ['products', 'img'],
    methods: {
        viewHide(product) {
            if (this.$root.filtered.length != 0) {
                return this.$root.filtered.includes(product)
            } else {
                return true
            }
            
        }
    },
    template: `
                <div class="products">
                    <product v-for="item of products"
                            :key="item.id_product"
                            :img="img"
                            :product="item"
                            v-show="viewHide(item)"
                            >                   
                    </product>
                </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    methods: {
        addProductCart(product){
            if (this.$root.basket.length == 0) { 
                this.addNewProduct(product)
            } else {
                this.increaseQuantity(product) ? true : this.addNewProduct(product)
            }
        },
        increaseQuantity(product) {
            for (let item of this.$root.basket) {
                if (item.id_product == product.id_product) {
                    return item.quantity++
                }
            }
            return false
        },
        addNewProduct(product) {
            this.$root.basket.push(Object.assign({quantity: 1}, product))
        }
    },
    template: `
            <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn" @click="addProductCart(product)">Купить</button>
                </div>
            </div>
    `
})
Vue.component('basket', {
    props: ['basket', 'img'],
    template: `
            <div class="cart-block">
                <p v-show="basket.length == 0">Нет товаров</p>
                    <basket-product
                        
                        v-for="item of basket"
                        :key="item.id_product"
                        :basketProduct="item"
                        :img="img"
                    >

                    </basket-product>
                <button class="buy-btn" v-show="basket.length > 0">Заказать</button>
            </div>
    `
})
Vue.component('basket-product', {
    props: ['basketProduct', 'img'],
    methods: {
        removeItemCart(product) {
            for (let item of this.$root.basket) {
                if (item.id_product == product.id_product && item.quantity > 1) {
                    return item.quantity--
                } else if (item.quantity === 1) {
                    const idx = this.$root.basket.findIndex(product => product.id_product === item.id_product)
                    this.$root.basket.splice(idx, 1)
                }
            }
        }
    },
    template: `
            <div class="cart-item">
                <img :src="img" alt="Some img">
                    <div>
                        <h3>{{basketProduct.product_name}}</h3>
                        <p>Количество: {{ basketProduct.quantity}}</p>
                        <p>Цена: {{ basketProduct.quantity * basketProduct.price }} $</p>
                        <button class="buy-btn" @click="removeItemCart(basketProduct)">x</button>
                    </div>
            </div>
    `
})
Vue.component('user-search', {
    data: () => {
        return {
            userSearch: ''
        }
    },
    methods: {
        filter(value){
            const regexp = new RegExp(value, 'i');
            this.$root.filtered = this.$root.products.filter(product => regexp.test(product.product_name));
        },
    },
    template: `
            <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit" @click.preventDefault="filter(userSearch)">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
})