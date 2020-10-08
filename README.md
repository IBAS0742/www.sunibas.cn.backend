# quickSpringBootFr

⭐该后台对应的静态资源在 [这里](https://github.com/IBAS0742/www.sunibas.cn.static)

application.dev.properties 中的配置内容说明如下

```text
# 这里的 question 是验证是否为管理员的问题，格式为
# 问题=md5(答案)
globalval.QuestionFile=D:\\codes\\node\\www.sunibas.cn.static\\jsons\\question.txt
# 这个是 后台的静态资源，位置在上面⭐说明了
spring.resources.static-locations=classpath:/static,file:/D:/codes/node/www.sunibas.cn.static
```

- [使用文档访问这里](README.md)

> 更重要的说明

- 1.表格id默认是 string 类型，并且 add 接口提供了使用 uuid 作为数据 id，插入后会返回

- 2.使用 fetch 调用接口

```javascript
Object.prototype.toParamString = function() {
    let obj = this;
	return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
     }).join('&');
}

fetch('/table/task/listByTaskIndex', {
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    method: 'POST',
    body:  {
        taskIndex: 'draught'
    }.toParamString()
})
```