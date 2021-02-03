function test(a,b){
    return sum = a+b
}
// 执行函数 要调用函数  test(1,2)

// 自执行函数语法:
(function func(){

}())  // 这个写法 外面一括号，直接获取返回值，函数里面计算一次

(function func(){

})()  // 先计算前面括号的值，然后再执行返回值，返回值必须得是函数


/*================================*/
var name = '张三';
(function (){
    console.log(name) //  标量提升， name为 undefined

    var name = '李四'
    console.log(name)  // 李四
})()
console.log(name)  // 张三， name 为全局作用域

var name = '张三';
(function (){
    console.log(name) // 函数内部没有name 这量，就全局找  就是 张三

    name = '李四';
    console.log(name)  // 李四 因为全局的 name 被赋值为 李四了
})()
console.log(name)   // 此时 name已经被改为 李四
