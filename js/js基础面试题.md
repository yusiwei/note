# js 数据类型
  基本数据类型：
        Boolean
        String
        Number
        Null
        Undefind
        Symbol
  引用数据类型
        Object
        Function

# js 数组的方法
    push: 末尾新增
    shif: 开头删除
    unshif: 开头新增
    pop：末尾删除
    splice：删除指定位置
    revers: 翻转数组
    sort： 排序

# JS typeof 返回哪些数据类型
  Object, String, Number, Fcuntion, Undefind, Boolean

# 3种强制类型转换和2种隐式类型转换
  强制：parseInt,parseFloat,Number
  隐式：===  ==

# ajax下 post， get有什么区别
  get是URL后面，post在body主体中
  get带参数有大小的限制
  安全问题，post更安全
  应用不同，get请求数据，post提交数据

# call，bind， apply 的区别
```js
    Object.call(this,obj1,obj2,obj3)
    Object.apply(this,arguments)
```
#  CommonJS 与 ES6 Module 的区别
```js
    commonJS 中 你在a.js中定义count的值 然后在a.js写方法改变count值，你在b.js调用值和方法 原来的 count 不会改变
    导出的变量是对 原值的拷贝
    ES6 Module中 你定义方法改变了 count 的值 最后 拿到的count 就已经被改变
    导出的变量是 对原值的引用
```

# ajax 如何解析json
  JSON.parse

# 事件委托是什么
  利用事件冒泡的原理，让自己触发的事件让父组件代替执行

# 闭包是什么
  有权读取其他函数作用域的内部变量函数，将函数内部和函数外部链接起来的桥梁，并且GC不会回收
  ///////有待增加

# Javascript的事件流模型都有什么?
  事件冒泡：事件有最具体的元素接受，向上传播
  事件捕获：事件由不具体的节点先接收，向下传递
  DOM 事件流：三个阶段，事件捕获--目标阶段--事件冒泡

#  null
```js
    var a = null;
    alert(typeof a);  // Object 空就是空对象
```
# 输出什么值
```js
    var a = 100;  
    function test(){  
        alert(a);  
        a = 10;  //去掉了var 就变成定义了全局变量了
        alert(a);  
    }  
    test();
    alert(a);
    100 10  10  最后把a给改了
```
# new 操作符具体干了什么事
  1) 创建一个空的对象，并且this指定该对象，同时继承了原型
  2) 属性和方法都被 this 引用在对象中
  3) 

# js 延迟加载的方法
  async, defer
  callback

# 数组降维
```js
    var arr=[[1,2],[3,4]];
    function Jw(obj){
        return Array.prototype.concat.apply([],obj);
    }
    Jw(arr);  // arr[1,2,3,4]
```
# 写出3个使用this的典型应用
```js
    onclick事件：this指当前事件的对象
    new new 里的 this
    call / apply 改变 this
```

```js
    var a = function (val, index) {
        console.log(index);
        return {
            fn: function (name) {
                return a(name, val);
            }
        }
    }

    var b = a(0); // undefined
    b.fn(1);  // 0
    b.fn(2);  // 0
    b.fn(3);  // 0
```

# 立即执行函数
```js
   (function(a){
     console.log(a)  // 输出 112
   })(112)
```
