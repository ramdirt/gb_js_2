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
                <button class="btn-search" type="submit" @click.prevent="filter(userSearch)">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
})
Vue.component('connect', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            statusConnect: '',
            showError: false
        }
    },
    template: `
        <p v-show="showError">{{ statusConnect }}</p>
    `,
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    return error;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.statusConnect = error
                })
        },

    },
    mounted(){
        this.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.$root.products.push(el);
                }
            })
            .catch(error => {
                this.statusConnect = `Ошибка загрузки каталога: ${error}`;
                this.showError = true
            })
        this.getJson(`/api/basket`)
            .then(data => {
                for(let el of data.contents){
                    this.$root.basket.push(el);
                }
            })
            .catch(error => {
                this.statusConnect = `Ошибка загрузки из файла: ${error} в корзину`;
                this.showError = true
            })
    },
               
})