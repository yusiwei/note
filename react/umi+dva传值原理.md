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