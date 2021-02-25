/*
 *   Complie 解析指令
 *
*/  
// 抽出来的工具类 处理text 处理 html 各种方法 去更新数据，和绑定watcher观察者
const compileUtile = {
    getVal(expr, vm){
        return expr.split('.').reduce((data, currentVal) => {
            console.log(currentVal);
            return data[currentVal]
        },vm.$data)
    },

    // 转换数据  替换数据
    getContentVal(expr, vm){
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1],vm) 
        })
    },

    text(node, expr, vm){ // expr:msg  text里的value是：学习MVVM原理
        // 取双大括号
        let value;
        if(expr.indexOf('{{') !== -1 ){
            
            // {{person.name}} -- {{person.age}}
            // 正则替换 
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // 绑定观察者，将来数据发生变化 触发这里的回调，进行更新
                new Watcher(vm, args[1], (newVal)=>{ // 此时expr有 {{a}}-{{b}} 改为 args[1]里{{person.name}} -- {{person.age}} 的值
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
        
                })
                return this.getVal(args[1],vm) 
            })
        } else {
            value = this.getVal(expr, vm)
        }
        this.updater.textUpdater(node, value)
    },

    html(node, expr, vm){
        const value = this.getVal(expr, vm)
        // 在初始值 html 中就绑定一个  watcher 值
        new Watcher(vm, expr, (newVal)=>{ // 回调函数回调的是我新的值
            this.updater.htmlUpdater(node, newVal)

        })
        this.updater.htmlUpdater(node, value)
    },
    model(node, expr, vm){
        const value = this.getVal(expr, vm)
        new Watcher(vm, expr, (newVal)=>{ // 回调函数回调的是我新的值
            this.updater.modelUpdater(node, newVal)

        })
        this.updater.modelUpdater(node, value)
    },

    on(node, expr, vm, eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false)
    },

    bind(node, expr, vm, attrName){
        // 自己实现
    },

    // 更新的函数
    updater:{
        textUpdater(node, value){
            node.textContent = value
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        modelUpdater(node, value) {
            node.value = value
        }
    }
}
class Compile {
    constructor(el, vm){
        this.el = this.isELementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 获取文档碎片对象，把它放入内存中，会减少页面的回流和重绘
        const fragment = this.node2Fragemnt(this.el);
        // console.log(fragment,'fragment') // 打印出了所有子元素

        // 3 编译模板
        this.compile(fragment)

        // 2 追加子元素到根元素上
        this.el.appendChild(fragment)
    }

    compile(fragment){
        // 1：获取子节点
        const childNodes = fragment.childNodes;
        // 获取子节点后转为数组进行遍历拿到每一个
        [...childNodes].forEach(child => {
            // console.log(child)
            if(this.isELementNode(child)){
                // 是元素节点
                // 编译元素节点
                this.compileElement(child)

            } else{
                // 文本节点
                // 编译文本节点
                this.compileText(child)
            }

            // 上面只遍历了第一层，最外层的节点，写判断继续遍历 比如 ul 下的 li
            if (child.childNodes && child.childNodes.length) {
                // 继续遍历
                this.compile(child)
            }
        })
    }
    
    // 编译元素
    compileElement(node){
        // <div v-text="msg"></div>
        const attrbutes = node.attributes;
        [...attrbutes].forEach(attr => {
            // console.log(attr)
            // 结构出来 name 就是当前指令
            const { name, value } = attr;
            if(this.isDirective(name)) { // 如果是 v- 开头的就是一个指令：v-text, v-html，v-model, v-on:click
               // 用数组接收一下 第一个不要不写,第二个当前的指令名
                const [,directive] = name.split('-') // text, html，model, on:click
                // on:click 再分割
                const [dirName, eventName] = directive.split(':') // text, html, model, on 
                // 更新数据，数据驱动视图
                compileUtile[dirName](node, value, this.vm, eventName) // 处理方法

                // 删除有指令的标签上的属性
                node.removeAttribute('v-'+ directive)
            } else if(this.isEventName(name)){  // 如果用的是 @ 符号: @click="handlerClick"
                // 按照 @ 符号分割   
                let [,eventName] = name.split('@')
                compileUtile['on'](node, value, this.vm, eventName) // 处理 on 的方法

            }
        })
    }

    // 编译文本
    compileText(node){
        // 编译  双大括号 {{}}
        const content = node.textContent

        // 用正则取双大括号
        if(/\{\{(.+?)\}\}/.test(content)){
            console.log(content);
            compileUtile['text'](node, content, this.vm)
        }

    }

    // 判断是否是事件名
    isEventName(attrName){
        return attrName.startsWith('@')
    }

    // 判断是不是 v- 开头的指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }


    node2Fragemnt(el){  // el 是整个根元素
        // 创建文档碎片
        const f = document.createDocumentFragment(); // 创建文档碎片
        let firstChild;
        // 拿出父节点的第一个子节点，如果有值 判断为真 追加进去
        while(firstChild = el.firstChild) {
            f.appendChild(firstChild)  // f 就是所有子节点
        }
        return f

    }
    // 怎么判断是一个节点呢
    isELementNode(node){
        return node.nodeType === 1; // 如果等于1  就是元素的节点对象
    }
}
class MVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if(this.$el){
            // 1. 实现一个数据的观察者
            new Observer(this.$data)  // 将 data 全部传进去 要观察这个data

            // 2. 实现一个指令解析器
            // 整个 MVue.js  已实现解析指令的方法了
            new Compile(this.$el, this); // this 整个实例
        }
    }
}