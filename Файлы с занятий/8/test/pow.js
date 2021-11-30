const fact = require('./fact');
let pow = (x, n) => {
    let res = 1;
    for (let i = 0; i < n; i++) {
        res *= x
    }
    return res;
}

module.exports = {pow, fact}; 