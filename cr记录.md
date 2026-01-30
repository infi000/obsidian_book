
- 时间字段需要着重的看。
- 接口新增/接口变更梳理
- 国际化是否有遗漏
- 新的页面梳理
- 魔法数字
- 时间戳不要用format('X')的方法，应该用unix()

useEffect内部依赖调用，useffect执行调用顺序

边界

函数调用写法是否严谨类似

a.b.c.b()

在国际化环境的cr中，对环境变量的写法CR
``` ts
goodcase
(window as any).ENV.PROJECT_ENV

badCase
process.env.PROJECT_ENV
```


组件类：
	客户项目 
	 弹窗的数据清除



关注公共utils的使用问题：

1、不实用公共函数、自己实现一个类似的。
2、公共函数使用方法不对
![[Pasted image 20260122140842.png]]


对useEffect的的依赖需要注意

当前需要修改的代码是谁的问题，需要标注出来。

接口返回数据没有做类型校验，直接使用

所有select组件检查是否有加前端模糊查询


移动端、小程序



国际相关
