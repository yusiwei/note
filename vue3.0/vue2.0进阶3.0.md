#  实例化
在 2.x 中用的 new Vue 创建实例，3.x使用 createApp 函数创建实例
在 2.x 所有属性和方法设置绑定在全局 Vue 对象上，3.x 改为绑定在 vue 实例上 ✨ 

# API
2.x 中，所有数据在 data中 定义返回，方法定义在 methods 下， this调用
  
3.x 中，所有逻辑代码在 setup 方法中实现， data, watch, compend methods, hooks 不再有 this
3.x 中 setup方法 在组件生命周期内只执行一次，不会重复执行
    watch 和 watchEffect
    watch 3.x中 支持监听单个或者多个属性，
    watchEffect 3.x 中 此方法返回一个方法，用于停止监听， 注册后会被立即使用

#  生命周期
· 2.x 生命周期钩子放在 methods 同级属性下

· 3.x 中先倒入钩子，然后在setup中注册，
· 3.x 移除了 beforeCreate 和 created 钩子，通过 setup 方法代替

# Fragment
· 2.x 中 template 只允许一个 根节点
· 2.x  挂载后 可以通过 this.$el  访问根元素 

· 3.x  支持多个根节点，如 react中的  <> </>
· 3.x  去掉this，并且支持Fragment，所以this.$el没有存在的意义，建议通过refs访问DOM

# setup
  3.x 中会先执行 setup 方法，再执行兼容2.x的其他方法，(data, computd,watch...)
  并且在 setup 执行中，无法访问 data中定义的属性，还没有执行到data方法


