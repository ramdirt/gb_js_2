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