const app = new Vue({
    el: '#app',
    data: {
        products: [],
        filtered: [],
        basket: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        isVisibleCart: false
    },
    methods: {
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
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
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.statusConnect = error
                })
        },
    },
    mounted() {
        console.log(this.basket)
    }
})