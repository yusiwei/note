# 1: vue2.0 响应式原理：
    单向：数据驱动视图
    双向：视图再去影响数据从而再去去更新视图
 入口函数 new MVVM传过来的数据  我们通过  Object.defineProperty(Observer：数据监听器) 劫持并监听所有属性getter，setter, 一旦数据发生变化就会通知 Dep 找到对应的 订阅者(Wtacher)去更新对应的视图
    getter: 获取值，一开始触发
    setter: 设置值，外界改变时候 触发
    Dep 有两个作用：第一个是通知Watcher更新视图
                   第二是 去存放多个 订阅器
 Compile 的作用是 解析指令


解析指令-编译模板的过程-较复杂
根元素中v-html,v-text...还有方法啊等等指令 拿出来通过 Compile这个类 解析这个指令，编译这个模板，然后在数据中找到这个数据再去更新视图

实现一个 指令解析器 Compile
