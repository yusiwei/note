# .umirc.ts 中或者 config 中 配置
```js
    const  plugins = [
        'umi-plugin-react',
        {
            antd: true,
            // hmr 和 immer 的作用
            // immer 无需关心state 返回的数据格式  开启后 直接用 return state.value +1
            dva: {
                hmr: true,
            },
            // locale: false,
            // 可全部变成中文
            locale: {
                default: 'zh-CN'
            },
            // dynamicImport 按需加载 当你点击页面的时候才加载 可做优化
            // dynamicImport: {
                // 指定加载的文件  直接指定文件的路径  可做一个全局点击进入页面时的loding 页
            //   loadingComponent: './components/PageLoading/index',
                // 加上这个之后 加载时的名字会变得有意义 比如加载user 就是 user.async.js
            //   webpackChunkName: true,
                // 定义路由的级别 定义3 就是3级页面都会有 loding效果  3往后都没有loading 效果了 
            //   level: 3,   
            // },
        }
    ]
    ... 等一系列配置
```