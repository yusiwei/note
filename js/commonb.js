let count = 3
function change(){
    count++ // 改变了变量
    console.log('原count值为：', count);  // 打印B.js模块中count的值 4
}

module.exports = {
    count,
    change
}