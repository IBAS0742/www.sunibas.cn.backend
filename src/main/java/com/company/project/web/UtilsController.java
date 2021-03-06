package com.company.project.web;
import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Pages;
import com.company.project.model.Utils;
import com.company.project.service.UtilsService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by CodeGenerator on 2021/01/04.
 */
@RestController
@RequestMapping("/utils")
public class UtilsController {
    @Autowired
    private GlobalVar globalVar;
    @Resource
    private UtilsService utilsService;

    @PostMapping("/add")
    public Result add(Utils utils,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        utils.setUserid(uid);
        utils.setId(UUID.randomUUID().toString());
        utilsService.save(utils);
        return ResultGenerator.genSuccessResult(utils);
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam String id,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        Condition condition = new Condition(Pages.class);
        condition.createCriteria().andEqualTo("uid",uid).andEqualTo("id",id);
        utilsService.deleteByCondition(condition);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Utils utils,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        utils.setUserid(uid);
        utilsService.update(utils);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam String id) {
        Utils utils = utilsService.findById(id);
        return ResultGenerator.genSuccessResult(utils);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Utils> list = utilsService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //根据条件进行查找 ex => data : { id : 12 }
    @PostMapping("/listBy")
    public Result listBy(@RequestParam Map<String,String> cond, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        Condition condition = new Condition(Utils.class);
        Iterator<String> keys = cond.keySet().iterator();
        while (keys.hasNext()) {
            String k = keys.next();
            if (k.equals("page") || k.equals("size")) {
                continue;
            }
            condition.createCriteria().andEqualTo(k,cond.get(k));
        }
        PageHelper.startPage(page, size);
        List<Utils> list = utilsService.findByCondition(condition);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
