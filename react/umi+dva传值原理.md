在dva中主要分3层
- models        最重要的概念，放各种数据，与数据交互功能
- services      请求后台的接口方法
- components    组件

# models中
```js
    {
        namespace: String, // 命名空间的名字，必填
        //namespace: 'global' 说明以下此处的dva命名空间为 global，即你调用的时候需要采用 global.XXX 的形式
        state: Object,   // 状态
        reducer: Object,  // 同步更新state修改的状态
        effects:Object,   // 副作用，处理异步逻辑
        // 当数据需要从服务器获取时，需要发起异步请求，请求到数据之后，通过调用 Reducers更新数据到全局state
        subscriptions: Object // 订阅数据源
    }
```

# reducer
用来处理同步操作，如果不需要调用接口的时候，我们前端传递的 action 可以直接调用 reducers里的方法
```js
    reducer 是一个函数，接收state 和 action，返回老的或新的 state
    // 比如 保存
    save(state, action){
        return {
            ...state,  // state：为当前 Model 下的所有 state值，可以console一下 输出下 就知道了
            ...action.payload  
            // action: 当前台页面需要进行数据操作时，会创建一个 action，
            // action存放了传递过来需要对当前state进行改变的数据
        }
    }

    reducers:{
        changeTitle(state, { payload: { num }){ 
        // changeTitle可以理解为一个方法名 
        // payload: 就是 action 里传递过来的数据。
        // num: 是传过来的，名字随便起，不是state中的num，这接收一个action
        
        return {
            ...state,
            ...num
        }
        
        // return 返回的是新的  state 舍弃了旧的 state，重新return 一个新的state 作为当前的Model中的 state
        // 一般情况下，我们要解开旧的 state,将它重新赋值给新的 state。...state 为 ES6 语法。
        // 将操作完成得数据累加到 return 中。
        // 同名的数据会覆盖，所以不用担心旧的 state 值会影响到新设置的值。
        // 不同名的数据会追加。
    }
```

# 页面调用
```js
    页面使用dispatch进行使用
    this.props.dispatch({
            type: 'pageModel/changeTitle',  //namespace+需要调用的reducer方法
            payload: 'Hello World',
        });
    };
```

# effects
用来处理异步操作，如果需要调取接口，前台页面需要调用 effects 中的方法
将数据取出来，在传递给 reducers 里的方法进行数据操作和同步 state
```js
    Dva 中的异步操作都放在 effects 中管理，基于 Redux-sage 实现
    Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作
    // 关于 yield 
    // 请求接口 yield call 是一个 Promise对象，只有在 Promise 返回的是 resolve 方法的情况下
    // 下面跟着 yield put 及后面的代码才会执行，若返回了 rejector 则后面的代码全部停止执行

    每一个 effect 都可以接收两个参数
    1: 包含 dispatch 携带参数 payload 的 action 对象
    2：dva 提供的 effect 函数内部的处理函数集

    第二个参数提供的处理函数集中， 常用的： call, put, select
    call:   执行异步函数
    put:    发出一个 Action，类似于 dispatch 触发 reducer 改变state
    select: 返回 model 中的 state //  相当于从 state里获取数据
```

# call
```js
    *deleteOne({ payload }, { call }) {
    //*:这个 * 符号，可能小伙伴们不熟悉，简单点，只要记住每个 effects 里方法前面都加上 * 即可。
    //这表明它是一个异步函数，里面可以使用 yield 等待其他异步函数执行结果。
    
    //payload:当前台页面需要进行数据操作时，就会创建一个 action,action 存放了传递过来需要对当前 state 进行改变的数据。
    //        payload 就是存放在 action 里面的数据。
    //deleteOne方法名，payload是传来的参数，是个对象，如果没参数可以写成{_,{call, put}}
    
    const rsp = yield call(cardsService.deleteOne,{num:payload.numCount});
    //call:与后台服务端接口进行交互。
    //第一个传参：后台服务器接口对应的名称。第二个参数：入参。
    //cardsService是引入service层那个js的一个名字，num是后台要求传的参数，rsp就是后台返回来的数据
    // 请求成功之后，调用 reducer 更新 state
 
 
    //service中异步请求(cardsService.js)
    //request 是我们封装的一个网络请求库
   async function deleteOne(data) {
       return request("queryFromApi", {
           data,
           method: "post",
          dataType: "payload"
        })
    }
```

# select put 
```js
    *deleteOne({ payload }, { select, put }) {
    　　effects:{
        const m = yield select((state) => state.test.num)
        //select就是用来选择上面state里的数据
        yield put({
        　　　type: "addNum",
            //put:  用来发出事件，即 action。一般调用 reducers 下的方法进行同步数据。
            //type: 该 Model 层里 reducers 下的方法名。
            //payload:  参数的传递。
            payload: {
        　      num: data, 
                // 把后台返回的数据赋值给了num
                //假如那个reducer中方法是由这里effects去触发的，那个num名必须是这里名字num，如果reducer中方法不是这触发，那名字可随便起
                return rsp;
            },
        }
    }
```

# subscriptions
```js 
// 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
setup ({ dispatch, history, query }) {
　　return history.listen(async ({ pathname, search, query}) => {
　　if (pathname==="/testdemo") { // 当进入testdemo这路由，就会触发fetchUser方法
　　　　　　dispatch({ type: "fetchUser" })
　　}
　})
}
```

# connect 连接 Model 和 Route 页面下的数据
```js
    dva 有提供 connect 方法，只要在每个 Routes 页面导入下面的代码即可
    import { connect } from dva // 或者现在直接在 umi里 import { connect } from umi

    // 对于组件
    在最后导出的时候使用 connect 进行与 Model 的链接
    export default connect(({ index }) => ({ index }))(indexPage)
    // index 是 Model 里的 namespace
```

# 前端页面调用 Model 方法
```js
    const { dispatch } = this.props;    //在 dva 中，可以通过 `this.props` 直接取得 `dispatch`
    
    dispatch ({
        type:'example/fetch',           //指定哪个 model 层里面的哪个 方法
        payload:{
            name:'exampleNew'
        },    //需要传递到 model 层里面的参数。payload 为固定用法(我自己的理解)。
    })
```
