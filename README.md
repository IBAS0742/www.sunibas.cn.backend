# quickSpringBootFr

> 修改时间 2019年8月16日12点01分

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