<div>
  <div>
      防抖：当你频繁触发后，n 秒内只执行一次
      防止一个函数在短时间内疯狂执行
      项目中会用到的比如：
      1：搜索框 input 事件
      2：鼠标移动 mousemove 事件
      3：视窗大小变化事件（比如 改变大小的时候 只希望在视窗大小固定的时候再执行某个方法）  等场景
      4: 防止多次提交表单，只执行最后提交的一次
      
      ps: 不希望某个事件在短时间内一直触发，影响性能，所以设置一个定时器，让这个事件在一定时间延后再执行，
      如果这个延迟中间又触发了事件，就把上次的事件绑定的定时器取消，重新绑定定时器给当前的事件上。
  </div>
  <div>
      节流：在固定时间内触发事件，每隔 n 秒 执行一次
      使用场景：
      1：监听页面滚动事件
      2：鼠标移动事件
      3：下拉刷新

  </div>
</div>

function debounce (func, wait){
  let time = null ;
  return function(){
    const that = this;
    time && clearTimeout(time); // 如果有 就取消当前及时，重新开始计时
    time = setTimeout(()=>{
      func.apply(that,arguments)
    },wait)
  }
}

// immediate 立即执行
function debounce2 (func, wait, immediate) {
  let time;
  return function(){
    const that = this;
    const args = arguments;
    time && clearTimeout(time);
    if(immediate) {
      const callNow = !time;
      time = setTimeout(()=>{
        time = null
      },wait)
      if(callNow) {
        func.apply(that,args)
      }
    } else {
      time = setTimeout(()=>{
        func.apply(that,args)
      },awit)
    }
  }
}

// 节流
function throttle(func,wait) {
  let that;
  let previous = 0;  // 记录之前时间
  return function (){
    let now = +new Date();
    that = this;
    if(now - previous > wait) {  // 如果 当前时间 - 点击世间 大于 你传入的时间(自己设置的那个时间) 就执行函数，否则不执行
      func.apply(that,arguments)
      previous = now
    }
  }
}

function throuttle2(func, wait) {
  typeof wait === 'undefined' ? wait = 500:null; // 没传默认给500
  let timer = null,
      prev = 0;
  return function (...params){ // ...params 就是用户点击事件
    let now = new Date(),
        remaining = wait - (now - prev) // 设置时间 - (当前时间 - 点击时间)
    if(remaining <= 0){   // 成立
        // 立即执行
        clearTimeout(timer);
        timer = null;
        prev = now;
        func(this, ...params);
    } else if (!timer) {
      // 为 true 的时候
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        prev = new Date();
        func(this,...params);
      },remaining)
    }
  }
}