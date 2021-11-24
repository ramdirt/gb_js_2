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
                    <connect></connect>
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
            const prod = Object.assign({quantity: 1}, product);
            this.$root.postJson(`/api/cart`, prod)
                .then(data => {
                    console.log(data)
                    if(data.result === 1) {
                        this.$root.basket.push(prod)
                    }
                })
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