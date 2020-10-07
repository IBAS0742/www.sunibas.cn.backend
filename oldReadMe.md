# quickSpringBootFr

## 1.整体使用方法
### 1.使用逆向工程建立数据库和实体的对应
修改test/java/com.company.project.core.ProjectConstant中的数据库名称、用户、密码、表明名即可。

### 2.增加数据库操作方法
#### 1.添加所有实体的方法可以在com.company.project.core.Mapper中添加通用的方法
```java
public void insertRetId(T t)
```
再在com.company.project.core中添加接口
```java
void insertRetId(T t);
```
再在com.company.project.core.AbstractService.java中添加实现
```java
public void insertRetId(T t) { mapper.insertRetId(t);}
```
随后在mapper中添加对应的xml即可
```xml
  <insert id="insertRetId" parameterType="com.company.project.model.Users">
    <selectKey keyProperty="id" order="AFTER" resultType="java.lang.Long">
      select LAST_INSERT_ID()
    </selectKey>
    INSERT INTO users(nickName,password,score,gender,msgMethod,imgUrl) VALUES(#{nickname},#{password},#{score},#{gender},#{msgmethod},#{imgurl})
  </insert>
```
#### 2.单独一个实体的方法可以在对应的mapper（在com.company.project.dao中的）文件中添加
```java
public int totalUsers();
```
随后在mapper中添加
```xml
<select id="totalUsers" resultType="java.lang.Integer">
    SELECT COUNT(*) from users
</select>
```
再在com.company.project.service中添加接口
```java
int totalUsers();
```
再在com.company.project.service.impl中添加实现
```java
@Override
public int totalUsers() {
    return usersMapper.totalUsers();
}
```

## 2.接口页面的使用
### 1.com.company.project.web.HomeController的目的只是实现重定向，希望不要删除
### 2.添加api接口，可以到com.company.project.configurer.SwaggerConfig
```java
    public Docket testApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("test")
                .genericModelSubstitutes(DeferredResult.class)
//                .genericModelSubstitutes(ResponseEntity.class)
                .useDefaultResponseMessages(false)
                .forCodeGeneration(true)
                .pathMapping("/")// base，最终调用接口后会和paths拼接在一起
                .select()
                .paths(
                        or(
                            //这里添加接口地址
                            regex("/users/.*"),
                            regex("/books/.*")
                        )
                )//过滤的接口
                .build()
                .apiInfo(testApiInfo());
    }
```

## 3.Redis使用
### 1.置请修改 redis.properties 文件，
### 2.使用redis，这里的usersController类给了一个使用实例
```java
public class UsersController {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    public Result checkLogin(@RequestParam(defaultValue = "") String token,
                             @RequestParam(defaultValue = "") Long id) {
        String token_ = (String)stringRedisTemplate.opsForHash().get("token",id.toString());
        if (token.equals(token_)) {
            //return token 一致
        } else {
            //return token 不一致
        }
    }
}
```

## 4.使用扩展(未开始编写)
### 1.简单文件上传