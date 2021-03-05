// A.js
import {count, change} from './B.js';

console.log('改变前：',count);

change()         // 调用模块B.js中的change方法，将原来的count + 1

console.log('改变后：', count);

// 运行A.js文件的结果
// 改变前：3
// 原count值为：4
// 改变后：4