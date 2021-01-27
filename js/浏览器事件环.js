   // 宏任务，微任务
   /** 宏任务队列有：
    *           事件绑定
    *           定时器
    *           ajax异步获取数据
    *  */ 
   /** 微任务队列有：
    *            resolve / reject
    *            promise.then(onfulfilled, onrejected)
    *            通知方法执行  await
    */
   <div>
        · 在主线程中，宏任务的执行时机，是微任务执行完毕时
        · 宏任务在执行过程中，所产生的微任务，只有当宏任务执行完毕后才会执行
        · 所谓的宏任务就是  事件队列
        · 事件线程只是负责事件的调用
        · 定义在 promise只有在回调被调用的时候才执行
        · 微任务放宏任务里 也是按顺序来的
   </div>
   setTimeout(() => {
        console.log(1)
   }, 0);
   new Promise(function executor(resole) {
       console.log(2)
       for(var i=0; i<1000; i++){
           i = 9999 && resole()
       }
       console.log(3)
   }).then(function(){
       console.log(4)
   })
   console.log(5) //  2 3 5 4 1  先走主线程->微任务->宏任务

    // 此时 new Promise 的时候，属于定义的时候，这个时候还运行在主线程中
    // .then 属于 promise 对象的函数，promise 是微任务
    // 而 5 在主线程中
   
   console.log(1)
   setTimeout(() => {
       console.log(2);
       new Promise(function (resolve){
           console.log(3)
           resolve()
       }).then(function (){
           console.log(4)
       })
   }, 0);
   new Promise(function (resolve) {
       console.log(5);
       resolve()
   }).then(function(){
       console.log(6)
   })
   setTimeout(() => {
    console.log(7);
    new Promise(function (resolve) {
        console.log(8);
        resolve()
    }).then(function(){
        console.log(9)
    })
   });
//    1 5 6 2 3 4 7 8 9 
                    