class BaseEs6Class {
    constructor(value = 0) {
        this.value = value
    }
    plus(...args) {
        this.value = args.reduce(((acc, elm) => {
            return acc + elm
        }), 0) + this.value
        return this
    }
    minus(...args) {
        this.value = this.value - args.reduce(((acc, elm) => {
            return acc + elm
        }), 0) 
        return this
    }
    multiply(n) {
        this.value = n * this.value
        return this
    }
    divide(n) {
        this.value = (this.value - (this.value % n)) / n
        return this
    }
    mod(n) {
        this.value = this.value % n
        return this
    }
    get() {
        return this.value
    }
}

class IntBuilder extends BaseEs6Class {
    static random (from, to) {
        return Math.floor(Math.random() * (to - from) + from)
    }
    constructor(value) {
       super(value)
   }
}

let intBuilder = new IntBuilder(10);
console.log(IntBuilder.random(10, 100))
console.log(intBuilder.plus(2, 3, 2).minus(1, 2).multiply(2).divide(4).mod(3).get())

function BaseEs5Class(str = "") {
    this.value = str
}
function StringBuilder(str) {
    BaseEs5Class.call(this, str)
}
StringBuilder.prototype.plus = function (...args) {
    this.value = this.value + args.join("")
    return this
}
StringBuilder.prototype.minus = function (n) {
    this.value = this.value.slice(0, -n)
    return this
}
StringBuilder.prototype.multiply = function (n) {
    const initValue = this.value
    for(i = 1; i < n; i++) {
        this.value = this.value + initValue
    }
    return this
}
StringBuilder.prototype.divide = function (n) {
    const k = Math.floor(this.value.length / n)
    this.value = this.value.slice(0, k)
    return this
}
StringBuilder.prototype.remove = function (str) {
    this.value = this.value.split("").map(elm => {
        if(elm !== str) {
            return elm
        }
    }).join("")
    return this
}
StringBuilder.prototype.sub = function (from, n) {
    this.value = this.value.split("").splice(n, from).join("")
    return this
}
StringBuilder.prototype.get = function () {
    return this.value
}
let strBuilder = new StringBuilder("Hello")

console.log(strBuilder.plus(' all', '!').minus(4).multiply(3).divide(4).remove('l').sub(1,1).get())