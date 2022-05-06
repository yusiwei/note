# 1：生命周期有哪些方法，一般在哪里发请求
```js
    beforeCreate 实例初始化，数据观测(data observer)和 event/watcher 事件被调用
    create 实例创建完成被调用，data observer属性，方法的运算，event/watcher事件回调，还没有 $el
    beforeMount 挂载开始之前，render函数首次被调用
    mounted el被创建的 vm.$el替换，并挂载到实例上之后调用该钩子
    beforeUpdate 数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前
    updated 数据更改导致虚拟DOM 重新渲染，在这之后会调用
    beforeDestroy 实例销毁之前，在这一步 实例还可以用
    destroy Vue实例销毁后调用，Vue所有东西会解绑，事件移除，子实例销毁
    keep-live activated 和 deactivated
    在哪里都可以发请求，主要看你要干什么事
```

# 2: vue MVVM 原理
```js
    vue 是采用数据劫持，发布订阅模式，通过Observe中 Object.defineProperty 的 getter setter 方法,数据变动时通知依赖收集器Dep，通知观察者去更新视图 
    MVVM创建实例时，整合了Oberser,Complie,Watcher 三大类，通过 Observe 监听Model变化，发生变化时，通知Watcher回调，去更新，通过Complie解析指令，Watcher作为Observe和Complie 桥梁 达到视图变化，数据更新，视图交互，数据Model更新，双向原理
```

# 如何理解自定义指令
```js
    用法：通常在做用户权限的时候用到自定义指令，比如普通管理员没有操作表单的权限，会给按钮添加自定义指令
    理解：从原理上讲，自定义指令就是把方法名弄成一个对象，当组件创建时候会去调用这些钩子函数去执行自定义指令的方法
```

# 模板编译原理
```js
    let { ast, render } = VueTemplateCompiler.compile(`<div>{{aaa}}</div>`)
    console.log(ast,render)
    // ast: tag标签，child 文本
    模板引擎的实现原理：with + new Function
    with 就是找属性的时候，根据传入的对象来找，new Function用变量接收字符串函数体和函数参数
    console.log(new Function(render).toString())
    
    render方法执行完毕后 生成 虚拟 DOM
    // with(this){rentun _c('div',[_s(aaa)])}  // _c是 创建节点 _s是状态
    代码生成
    let str = 'return' + `hello ${name}`
    let func = new Function('name',str)
    func('Word')   // hellow Word

    template转成 render函数，再由render函数返回虚拟节点，再转成真是DOM
    render函数 就是 把当前的HTML转为ast语法树，最后生成代码
```

# vue 的生命周期理解
```js
    生命周期其实就是一个回调函数，他内部是一个数组，然后遍历这个数组一次执行
```

# Vue mixin
```js
    混合机制，实现组件内的复用，引入组件后 多个组件可以共享数据和方法
```

# nextClick 原理
```JS
    考察的就是浏览器事件环
    作用：防止多次更新，并且当 当前DOM 更新后的再去获取DOM的元素
    源码：其实就是一个 promise
```

# vue solt是如何实现的，什么时候用它
```js
    用法：在组件内插入新标签
    理解：vue slot分为两种：
        1)普通插槽，渲染时机是在 父组件中渲染，父组件渲染完毕后 子组件内容替换
        2)作用域插槽，渲染时机是在 子组件中，父组件渲染成函数，子组件调用方法且传入值
```

# computed 和 watch 的区别 
```js
    1) computed 里的属性和 data里的属性不能重复名
       watch 监听的属性必须是要存在，data里 或者  computed里
    2) computed 定义的函数里需要依赖一个或者多个数据项，每个都有返回值
       watch 函数接受新值和旧值
    3) watch 允许异步操作  
    4) computed定义每一个计算属性 都会被缓存起来，当属性变化了，才会重新计算当前的值，
       watch 是监听，监听属性的变化
```

# keep-live 平时在哪用，原理是什么 
```js
    用法：缓存页面的时候用，你将页面缓存起来后，第二次调用就不会再执行生命周期，相当于静态页面，当然它缓存的是虚拟DOM
      keep-live 上有 include匹配，exclude, max,三个属性
      keep-live生命周期：activated 页面第一次进入的的时候  created-> mounted -> activated
                        deactivated 页面退出的时候触发
    原理：keep-live 主要是缓存，采用的 LRU 算法和作用域插槽(在父组件中访问子组件的数据)
        LRU 算法 是 最近最久未适用法: 最近是最后一项，最久是第一个
        比如 A,B,C,D 
        <!-- 再议 -->
        <!-- [A,B,C,D]  // 最近就是 D  最久就是A，此时要插入 Q 那么就会删除 A
        [B,C,D,Q] -->
```
# vuex 的理解
```js
    用法：一般全局存储用户信息，配合sessionStorage存储用户token，和组件之间传值会用到
    原理：vuex就是创造了一个全局的 vue 实例，我们可以更改vue的实例达到共享的目的，所有组件都可以取这个实例。
        核心 就是new Vue 所有组件去拿他的状态，action写的是异步的逻辑，muntion去更新状态
```

# vue 中使用了哪些设计模式
```js
     1)工厂模式： 你传入什么参数 就创建什么实例，
     2)单例模式： 整个程序中有且仅有一个的实例，比如 vuex
     3)发布-订阅模式： 订阅者想订阅的事件注册到调度中心，当事件触发，发布者发布事件到调度中心，再由调度者统一调度订阅者
     4)观察者模式： watcher &  dep 的关系
```
# vue2.x 和 vue 3.0 的区别
```js
    1) 2.x 对ts支持不友好，vue3.0 是 基于函数的，ts类型很好推断，3.0本身就基于ts写的
    2) 2.x 中大量API都挂载在vue 对象的原型上，对象的哪些属性用到了或者没用到 都没办法去查找，但3.0是函数就能知道这个函数有没有被用过
    3) 3.0 对源代码压缩做了很好的处理
    3.1)  2.x 难以实现  tree shaking
    4) 3.0 对虚拟DOM 进行了重写
    5) 3.0 的compostionAPI受 reactHook启发，写法差不多
```

# Tree Shaking 感念
```js
    用法：在 webpack.config js的 development模式下配置
    //在开发模式下配置 tree shakeing
    optimization: {
        usedExports: true
    }
    tree shaking 就是
    比如你引进 lodash 这个库，体积比较大，最后只用到一个方法，这个时候就用 treeshaKing将很多没有用到的模块过滤掉，删除无用的代码
```
# react和vue比较来说有什么区别


# css
# 回流
你对页面的布局啊，隐藏属性啊，这类操作导致页面需要重新构建，这成为回流，每个页面至少有一次回流，因为这事页面初始化渲染的 rendr tree
# 重绘
你对页面标签，进行颜色，背景的设置 不改变布局 叫重绘
# 区别：
回流必将引起重绘，而重绘不一定影响回流

# H5新特性
标签语义化  heard footer  nav
增强型表单  placehoder required
音频，视频 audio video
canvas 画布
本地存储  localStorage ,sessionStorage session
webSocket  通信协议

# CSS3
文字阴影  text-shadow
边框圆角  border-radius 边框阴影 border-shadow
盒模型  box-sizing
背景  background-size
渐变   线性渐变
过渡动画
flex布局

# 浏览器如果解析页面
1：用户输入url后，浏览器解析HTML成DOM树
2：处理CSS标记，结构和样式成CSSOM
3：将DOM树和CSSOM合并渲染为  rendering tree 代表为一个对象
4：布局，渲染

# 元素垂直居中
1 父元素弹性盒子，子元素flex center
2 父相对子绝对   子元素向上移动自身的一半   transfrom:translate(-50%,-50%)
3  父相子绝对    子元素上下左右设为0  margin 设置  auto

# 块级元素：span  a  img input select
# 行内元素：div  p h1-h6 ul  li

# 语义化的好处
页面结构清晰，便于后期维护，便于浏览器，搜索引擎解析，利于seo

# 浏览器的兼容性
不同浏览器解析会存在差异，所以产生兼容性
1：c3新属性，需要加前缀
2：图片放在一起默认有间距，可以利用浮动清楚间距
3：不同浏览器的margin和padding不同：初始化全局样式


# js
# js的数据类型：分为八种
基本数据类型：Number String  Booleam NULL  undefined  ES6新增的 Symbol 表示唯一性 Bigint 表示任意整数
引用类型：Object 包含 object Array function Date等

# null和undefined 区别
相同点：就是 都是基本数据类型，并且只有一个值 就是他们本身
# 不同点：
1：undefined代表未定义，定义了形参，没有传实参  就是undefined
2：变量声明 但不存在
3：对象属性名不存在  undefined
4：函数没有返回值，没有retrun 也是 undefined
null
表示空对象，也是对象原型链的终点
主要用于赋值，初始化
typeof null 的结果是Object。

# 事件  事件类型分为两种：
事件捕获：由外向内，从事件的顶端开始，逐渐向下查找，直到找到目标元素
事件冒泡：冒泡就是由内向外，从具体的目前元素开始向上传递，直到根节点
事件委托：利用事件冒泡机制，把子元素的事件绑定到父元素上，如果子元素阻止了事件冒泡，那么事件委托无法执行

# JS作用域和作用域链
作用域：自定义变量的区域，并且规则：函数作用域是函数内部使用，函数外的称为全局作用域, 保证执行的环境和访问的权限
	内部函数访问外部函数的变量链式查找的机制就被成为作用域链
全局就是 window 在哪里都能访问，函数就是创建的独立作用域，在函数内部访问，
Es6新增块级作用域，由大括号 if  for 这种

# 防抖和节流
防抖：指定触发事件后n秒内函数只执行一次，再次期间如果重新触发 又会重新计算(只在最后一次事件才触发一次)
节流：连续触发事件但是在n秒中只执行一次(不管触发多频繁，在规定时间内执行一次)

# 对象和面向对象
对象：就是 属性和方法的合集就叫对象
面向对象：js的思想，它有继承，封装，多态

# 如何判断对象是否相等
Object.keys(obj).length  判断长度

# 什么是深拷贝，浅拷贝
浅拷贝，就是基本数据类型拷贝的就是基本数据类型，引用数据类型拷贝的是内存地址 object,assing()  ...
深拷贝，就是把对象从内存中完成的拷贝出来，从堆内存中开辟新区域，就算修改原有的对象属性，拷贝后的对象也不受影响 JSON
对象赋值 就是把栈内存的对象赋值给一个新变量，赋的值是栈内存的地址，而不是堆中的数据 

# 数组的方法 
sort排序, push尾部加，pop尾部删  shift头部删，unshift头部添加，slice截取返回新数组，join分割字符串，cocat合并，reverse反转

# call apply bind 区别
call   原型上的方法    传参不一样  第一个参数都是this要指向的对象   第二个参数接受一个参数列表   
apply  原型上的方法   第一个参数都是this要指向的对象 第二个参数接受一个数组
bind   第一个参数都是this要指向的对象  第二个参数接受一个参数列表
改变this指向和函数调用

# 函数柯里化
将一个接受多个参数的函数，转化为接收一个参数，且不改变输出结果的一种办法，
var add = function(x,y) {
     return x+y
}
add(1,2)
// 柯里化后
var add = function(x){
    return function (y) {
      return  x+y
    }
}
add(1)(2)

# 高阶函数
将函数作为参数，函数的返回值返回的是函数
function higherFunction(param,callback){
     return callback(param)
}

# 构造函数
new的原理
创建一个空对象，构造对象中的this指向这个空对象，执行原型链接
