# 1：css选择器有哪些
    类选择器 .class
    id 选择器  #id
    通用选择器  *(星号 通配符)
    组合选择器  (1):空格 A B (2): > 大于号 子选择器链接  A>B  (3)+ 加号  A+B 兄弟选择器 
    
    伪类：:active, :any, first-child, hover,  focus,  last-child, nth-child, 
    伪元素：before  after  

# 2：css 样式权重和优先级
    !important > 行内样式 > 内联样式  and  外联样式
    !important > 行内直接写的样式 > id > class > tag 
    从 0 开始 行内+1000， id +100，  class类选择器或者伪类+10， 一个元素或者伪元素+1， 通配符+0

# css 性能提高
  1：减少css合并，如果页面中有10个 css文件，每个文件 1k也比只加载一个100k的文件慢
  2：减少css嵌套，最好不要嵌套三层以上
  3：不要在ID 选择器前面进行嵌套，权限大浪费性能
  4：建立公共样式类，把相同样式提出来
  5：减少通配符*
  6：运用css 继承机制，父级有的，子节点无需再写
  7：少用 css,rest重置样式是规范，但很多操作不友好，可选择 normolize.css
  8：css压缩(在线压缩工具- YUI Compressor)
  9:GZIP压缩，是一种流行的文件压缩算法

# 性能优化
  1：避免使用 @import 外部的css文件中使用 @import会使页面加载时增加额外的延迟 可改用link标签
  2：避免过分重排-重排(重新计算页面，改变窗口大小啊)-重绘(css样式的更改，加颜色啊背景啊 之类的)
  3：去重复的 css 代码
