describe('Соответствие значение', () => {
    it('Проверка на соответствие значения переменной x значению 10', () => {
        let x = 10;
        expect(x).toBe(10);
    })
    it('Проверка на соответствие значения переменной x значению 20', () => {
        let x = 20;
        expect(x).toBe(20);
    })
})

describe('Дополнительная функция тестирования', () => {
    it('Сравнение объектов', () => {
        let test = () => {};
        let user1 = {
            name: 'Иван',
            age: 26,
            go: test
        };
        let user2 = {
            name: 'Иван',
            age: 26,
            go: test
        }
        expect(user1).toEqual(user2)
    });
    it('RegExp', () => {
        let text = 'Test aBCd jasmine';
        expect(text).toMatch(/ABCD/i);
    });
    it('Arrays', () => {
        let arr = ['one', 'two']
        expect(arr).toContain('two')
    })
})