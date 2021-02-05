// 随记--- react 函数式编程，优势：代码灵活，方便测试
// 1 
import React, { Component } from 'react';
// 相当于  js 的解构:
import React from 'react';
const Component = React.Component


// 2
// react 中不允许直接操作 state 中的数据， 要先拿变量接收 改完后  再复制到 SetState 中

class Text extends Component{
    constructor(props){
        super(props)   // 3 super 继承了 调用 Component中的 props 方法
    }
    state = { }
    render(){
        return (
            // react Fragment 相当于 vue template 
            // react 的 <></> 等于 <Fragment></Fragment>
            <Fragment>
                 <ul className='my_class'>
                    <li>react</li>
                    <li>react hooks</li>
                </ul>
            </Fragment>
            // 4
            // 编译成初始react 的写法
            // cosnt childre1 = React.createElement('li', null, 'react')
            // const childre2 = React.createElement('li', null, 'react hooks')
            // childre1 = React.createElement('ul', {className:'my_class'}, childre1,childre2)
        )
    }

    // 5:
    // react中 组件性能优化
    //  父组件传值给子组件  防止子组件的 render函数一直触发，影响性能问题
    // 在子组件中使用  
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true
        } else {
            return false
        }
    }
}
export default Text