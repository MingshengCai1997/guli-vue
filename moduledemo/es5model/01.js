const sum = function(a, b) {
    return parseInt(a) + parseInt(b)
}
const subtract = function(a, b) {
    return parseInt(a) - parseInt(b)
}

// 设置那些方法可以被外部的js调用
module.exports = {
    sum  
}