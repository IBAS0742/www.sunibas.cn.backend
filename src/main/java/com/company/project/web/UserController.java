package com.company.project.web;
import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.User;
import com.company.project.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
* Created by CodeGenerator on 2020/10/05.
*/
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private GlobalVar globalVar;

    @Resource
    private UserService userService;

    @PostMapping("/register")
    public Result register(User user) throws NoSuchAlgorithmException {
        user.setId(UUID.randomUUID().toString());
        User u = userService.findBy("username",user.getUsername());
        if (u == null) {
            user.setPassword(globalVar.md5(user.getPassword()));
            userService.save(user);
            return ResultGenerator.genSuccessResult(user);
        } else {
            return ResultGenerator.genFailResult("用户名已存在");
        }
    }

    @PostMapping("/login")
    public Result login(User user) throws NoSuchAlgorithmException {
        Condition condition = new Condition(User.class);
        user.setPassword(globalVar.md5(user.getPassword()));
        condition.createCriteria().andEqualTo("username",user.getUsername()).andEqualTo("password",user.getPassword());
        List<User> us = userService.findByCondition(condition);
        if (us.size() > 0) {
            String token = UUID.randomUUID().toString();
            user = us.get(0);
            globalVar.addLoginUser(token,user.getId());
            user.setId(token);
//            if (user.getUsername().equals(globalVar.getAdminUserName())) {
//                globalVar.setAdminToken(token);
//            }
            return ResultGenerator.genSuccessResult(user);
        } else {
            return ResultGenerator.genFailResult("用户名或密码错误");
        }
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam String id,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        userService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(User user,String token) {
        if (globalVar.checkSelfOrAdmin(token,user.getId())) {
            return ResultGenerator.genFailResult("无权限");
        }
        userService.update(user);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam String id,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        User user = userService.findById(id);
        return ResultGenerator.genSuccessResult(user);
    }
    @PostMapping("/info")
    public Result info(String token) {
        String id = globalVar.getUserId(token);
        if (id != null) {
            Condition condition = new Condition(User.class);
            condition.createCriteria().andEqualTo("id",id);
            List<User> us = userService.findByCondition(condition);
            if (us.size() > 0) {
                User u = us.get(0);
                u.setId(token);
                return ResultGenerator.genSuccessResult(u).setMessage(globalVar.checkAdmin(token) ? "admin" : "noadmin");
            } else {
                return ResultGenerator.genFailResult("未找到个人信息或登录超时");
            }
        } else {
            return ResultGenerator.genFailResult("未找到个人信息或登录超时");
        }
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        PageHelper.startPage(page, size);
        List<User> list = userService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //根据条件进行查找 ex => data : { id : 12 }
    @PostMapping("/listBy")
    public Result listBy(@RequestParam Map<String,String> cond, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        Condition condition = new Condition(User.class);
        Iterator<String> keys = cond.keySet().iterator();
        while (keys.hasNext()) {
            String k = keys.next();
            if (k.equals("page") || k.equals("size")) {
                continue;
            }
            condition.createCriteria().andEqualTo(k,cond.get(k));
        }
        PageHelper.startPage(page, size);
        List<User> list = userService.findByCondition(condition);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
