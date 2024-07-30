const add = (a, b) => a + b; // same as exports.add = (a,b) => a+b; without line 6
const subtract = (a, b) => a - b; // same as exports.subtract = (a,b) => a-b; without line 6
const multiply = (a, b) => a * b; // same as exports.multiply = (a,b) => a*b; without line 6
const divide = (a, b) => a / b; // same as exports.divide = (a,b) => a/b; without line 6

module.exports = { add, subtract, multiply, divide };