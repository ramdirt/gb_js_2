const action = require('../../pow');

describe('Возведение в степень', () => {
    it('2 ^ 3', () => {
        expect(action.pow(2, 3)).toBe(8);
    })
    it('3 ^ 3', () => {
        expect(action.pow(3, 3)).toBe(27);
    })
    it('5 ^ 5', () => {
        expect(action.pow(5, 5)).toBe(3125);
    })
})

describe('Проверка факториала', () => {
    it('3', () => {
        expect(action.fact(3)).toBe(6);
    })
    it('5', () => {
        expect(action.pow(5)).toBe(120);
    })
})