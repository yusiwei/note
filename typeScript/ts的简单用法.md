# ts 好处
因为js是弱类型，很多错误只有在运行的时候才会发现，导致不必要的麻烦
ts 是强类型，提供一套静态检测机制，写代码过程中更改变量类型，ts会直接报错，帮助编码
为帮助js弥补错误而生

# TS 有 枚举、泛型、类型转换、命名空间、声明文件、类、接口等
```js
  1:ts支持与js 几乎相同的数据类型，还提供了 枚举类型，元祖 方便使用
    boolean
    number
    string

  2: 数组和元祖类型的声明
      类型一致的时候：
        2.1: Array<number> -> [1, 2 , 3]
           string[]      -> ['1', ',2', '3']
      类型不一致的时候：
        2.2：(number|string)[]  -> [1, 'a', 2, 'd']
      自由任意类型元素的数组
        2.3：any[]  -> [1, 'a', 2, false]

  3: 严格限制类型和长度的元祖数组 
        元祖： 元祖类型其实就是数组类型的扩展, 元祖用于保存定长定数据类型的数据
        3.1: 元祖类型 [string, number, boolean]  -> ['a',1, false]

  4: enum枚举
     枚举：枚举用于表示固定的几个取值 比如(一年只有四季、人的性别只能是男或者女)
      // 简写
      enum Gender{
          Male,
          Femal
      }
      console.log(Gender.Male); // 0  按下标

  5： any 任意类型  ps:如果全部都是any 就不用写 ts了

  6：void 类型  
     一般用于函数返回值  TS中只有null和undefined可以赋值给void类型
  
  7: never 类型
     永不存在的值的类型,一般用于抛出异常或根本不可能有返回值的函数。

  8： Object对象类型 
      let obj:object;
      obj = {name:'lnj', age:33}   
      // 一般类型 都直接 用 interface 定义了
  9  接口 interface 类型
     使用接口约束开发者的数据
      interface FullName{
          firstName:string
          lastName:string
          middleName?:string   // 定义接口可选 属性 可少一个 
      }

      9.2：多一个，用索引签名
           只要key和value满足条件 无论有多少个属性都无所谓
            interface FullName {
                [propName:string]:string
            }
            let obj:FullName = {
              firstName:'Jonathan', // 满足 string 即可
              lastName:'Lee',
            }

            interface stringArray {
                [propName:number]:string
            }

            let arr:stringArray = {
                0:'a',
                1:'b',
                2:'c'
            };

  10 接口继承
      TS中的接口和JS中的类一样是可以继承的
  
  11 函数接口
     接口来定义函数的参数和返回值。
      interface SumInterface {
        (a:number, b:number):number
      }
      // 建议使用这种写法
      let sum:SumInterface= (x,y) =>{
        return x + y;
      }
```
# 函数
```js
  js函数 和 ts函数
  js: 
    // 命名函数
    function say1(name) {
      console.log(name);
    }

    // 匿名函数
    let say2 = function (name) {
      console.log(name);
    }

    // 箭头函数
    let say3 = (name) => {
      console.log(name);
    }
  在 ts 中
    // 命名函数
    // val 为默认参数
    function say1(name:string, val:number=10):void {
      console.log(name, val);
    }

    // 匿名函数
    // val 可选参数
    let say2 = function (name:string,val?number):void {
      console.log(name, val);
    }

    // 箭头函数
    // ags 剩余参数
    let say3 = (name:string,...ags:number[]):void =>{
      console.log(name, ags);
    }
```
# 类型断言
```js
    类型断言：
      1：解释型强制类型转换
      2：类型断言就是告诉编译器，相信我，它就是这个类型
    使用：
      let len = (str as string).length;  // str 为 string 类型

    可将 any 转为 string 类型
      let str:any = 'it666';
      // 当还是any的时候是没有.length的提示的
      let len = (str as string).length;
      console.log(len);   // 5
```
