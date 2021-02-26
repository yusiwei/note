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
实现一个 数据监听器 Observer
实现一个 Watcher 去更新视图
实现一个 proxy  

绑定监听后-再劫持数据Observe 去遍历所有属性进行劫持 get初始化的时候就监听了，set是你修改了状态才触发
遍历依赖收集器 Dep 依次去更新 update方法有callback回调，把新的值再返回回去


面试题
阐述一下你说理解的MVVM 响应式原理
vue是采用数据劫持配合发布者订阅者模式的方式，通过 Object.defineProperty来劫持各个属性的 setter,getter,在数据变动时，发布消息给订阅者 dep(依赖收集器),通知观察者 更新(watcher)，做出对应的回调函数然后去更新视图

MVVM 创建实例时，作为绑定的入口，整合了Observe,Compile,和 Watcher 类，三者，然后通过Observe 监听 Model 数据变化，如果一旦发生变化 通知 Watcher 去回调 更新，通过 Complie 类去解析编译模板指令，最终利用 Watcher 搭起Observe和 Complie通信的桥梁，达到数据变化=> 视图更新，视图交互变化=>数据Model 变更双向的绑定效果--并且自己实现过，大概是不到300行的代码，实现了一下