 // 所有的观察者
 class Watcher{
     constructor(vm, expr, cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // 先把旧值保存起来
        this.oldVal = this.getOldVal()
     }
     // 取 旧值的方法 - 初始化的值
     getOldVal(){
         // 把观察者挂载到当前实例上 
        Dep.target = this;
        const oldVal =  compileUtile.getVal(this.expr, this.vm)
        // 用完销毁，删除 不然 一直会有重复的 Watcher
        Dep.target = null;
        return oldVal
     }

     // 判断新值和旧值有没有变化 有变化就回调回去给它更新视图
     update(){
        // 获取新值
        const newVal =  compileUtile.getVal(this.expr, this.vm)
        // 如果不相等
        if(newVal !== this.oldVal) {
            this.cb(newVal);   // 就把新值 callback出去 回调出去
        }
     }
 }
 
 // 依赖收集
 class Dep{
     constructor(){
         // 依赖收集器的容器
         this.subs = []
     }
     // 收集观察者
     addSub(watcher){
         this.subs.push(watcher);
     }
     // 通知观察者去更新视图的方法
     notify(){
         // 遍历找到对应的观察者进行更新
         console.log('观察者', this.subs)
         this.subs.forEach(w => w.update())
     }
 } 

 // 劫持监听所有属性 观察者
 class Observer{
     constructor(data){
         this.observe(data)
     }
     observe(data){
         // 只做对象处理
         /**
          {
              person:{
                    name:'xx',
                    age:18,
                    fav:{
                        a:'爱好'
                    }
                },
          }
          监听每一个属性 去劫持它
          */
         if ( data && typeof data === 'object'){
            Object.keys(data).forEach(key=>{
                this.defineReactive(data, key, data[key])

            })
         }
     }

     // 劫持并监听所有的方法
     defineReactive(obj, key, value){
         // 会有很多次对象，先递归遍历 
         // value 传进去，可能value下还有对象
         this.observe(value)
         /**
          * 将 Observer 和 Dep 进行关联
          * 1：在劫持数据的时候 创建 Dep(依赖收集器)
          * 2：然后在 dep中添加观察者
          */
         const dep = new Dep()
         
         // 劫持 当前传进来的对象
         Object.defineProperty(obj, key, {
             enumerable: true,   // 是否可变
             configurable: false, // 是否可以去更改编写 
             // 获取值走 get
             get(){
                 // 添加订阅数据变化时，往 Dep中添加观察者
                 // 收集依赖，每个观察者的依赖 一个属性对应一个观察者
                 // 有值 再做操作 
                Dep.target && dep.addSub(Dep.target)
                return value
             },
             // 设置值 新值旧值有没有变化 如果有变化才赋值
             set:(newVal)=>{
                this.observe(newVal)
                if(newVal !== value){
                    value= newVal
                }
                // 告诉 Dep 通知变化
                dep.notify()
             }
         })
     }
 }