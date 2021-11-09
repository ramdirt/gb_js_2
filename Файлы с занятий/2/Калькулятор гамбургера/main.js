'use strict';

class Hamburger {
    constructor() {
        this.composition = []
        this.recipe = [
            {name: "big", price: 100, calorie: 40},
            {name: "small", price: 50, calorie: 20},
            {name: "chesse", price: 10, calorie: 20},
            {name: "salad", price: 20, calorie: 5},
            {name: "potapo", price: 15, calorie: 10},
            {name: "seasoning", price: 15, calorie: 0},
            {name: "mayonnaise", price: 20, calorie: 5}
        ]
        this.checkbox = document.querySelectorAll('input')
        
        this.validateStatusCheckbox()
        this.switchStatusCheckbox()
        this.getCheckbox()
        
    }

    // Активация функций при нажатии на любой чекбокс
    getCheckbox() {
        let fillings = this.checkbox
        fillings.forEach(filling => {
            filling.addEventListener('click', () => {
                this.findRecipe()
                this.collectRecipe()
                this.validateStatusCheckbox()
            })
        })
    }

    // Собирает список ингридиентов из включенных чекбоксов
    findRecipe() {
        let fillings = this.checkbox
        let listComposition = []
        fillings.forEach(filling => {
            if (filling.checked) {
                listComposition.push(filling.id)
            }
        })
    
        return listComposition
    }

    // Собирает массив из списка ингридиентов 
    collectRecipe() {
        this.composition.length = 0

        let list = this.findRecipe()
        if (list.length > 0)
            for (let item of list) {
                this.composition.push(this.recipe.find(el => el.name == item))
            }

        this.validateStatusCheckbox()
        if (this.validateStatusCheckbox() == 2) {
            this.calculatePrice()
            this.calculateCalories()
        }


    }

    // Счет стоимости
    calculatePrice() {       
        let $price = document.querySelector('span[data-total="price"]')
        let price = 0

        for (let item of this.composition) {
            price += item.price
        }

        $price.innerHTML = price
    }

    // Счет калорий
    calculateCalories() {    
        let $calorie = document.querySelector('span[data-total="calorie"]')
        let calorie = 0

        for (let item of this.composition) {
            calorie += item.calorie
        }

        $calorie.innerHTML = calorie
    }

    // Переключает статус чекбокса
    switchStatusCheckbox() {
        this.checkbox.forEach(checkbox => {
            if (checkbox.name == 'filling') {
                checkbox.addEventListener('click', event => {
                    if (event.currentTarget.checked) {
                        event.currentTarget.dataset.status = 'on'
                    } else {
                        event.currentTarget.dataset.status = 'off'
                    }
                })
            }
            if (checkbox.name == 'size') {
                checkbox.addEventListener('click', event => {
                    let $bigSize = document.querySelector('input[id="big"]') 
                    let $smallSize = document.querySelector('input[id="small"]')

                    if (event.currentTarget.id == 'big') {
                        $bigSize.dataset.status = 'on'
                        $smallSize.dataset.status = 'off'
                    } else {
                        $bigSize.dataset.status = 'off'
                        $smallSize.dataset.status = 'on'
                    }
                }) 
            }
        })
        
    }

    // Проверка того что размер и начинка выбраны
    validateStatusCheckbox() {
        let size = 0;
        let filling = 0;
        const $validate__size = document.querySelector('.validate__size')
        const $validate__filling = document.querySelector('.validate__filling')
        this.checkbox.forEach(checkbox => {
            if (checkbox.name == 'filling') {
                if (checkbox.dataset.status == 'on') {
                    $validate__filling.innerHTML = ''
                    size = 1
                } else if (size == 0) {
                    this.calculatePrice()
                    this.calculateCalories()
                    $validate__filling.innerHTML = '*Не выбрана начинка'
                }
                

            }
            if (checkbox.name == 'size') {
                if (checkbox.dataset.status == 'on') {
                    $validate__size.innerHTML = ''
                    filling = 1
                }

            }   
        })
        return size + filling
    }

  }


let hamburger = new Hamburger;
