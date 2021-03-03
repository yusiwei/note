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
# 2: 

# 如何理解自定义指令
```js
    用法：通常在做用户权限的时候用到自定义指令，比如普通管理员没有操作表单的权限，会给按钮添加自定义指令
    理解：从原理上讲，自定义指令就是把方法名弄成一个对象，当组件创建时候会去调用这些钩子函数去执行自定义指令的方法
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
