package com.company.project.web;
import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Pages;
import com.company.project.service.PagesService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.ParametersAreNonnullByDefault;
import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
* Created by CodeGenerator on 2020/10/05.
*/
@RestController
@RequestMapping("/pages")
public class PagesController {
    @Autowired
    private GlobalVar globalVar;
    @Resource
    private PagesService pagesService;

    @PostMapping("/add")
    public Result add(Pages pages,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        pages.setId(UUID.randomUUID().toString());
        pagesService.save(pages);
        return ResultGenerator.genSuccessResult(pages);
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam String id,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        pagesService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Pages pages,String token) {
        if (!globalVar.checkAdmin(token)) {
            return ResultGenerator.genFailResult("无权限");
        }
        pagesService.update(pages);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam String id) {
        Pages pages = pagesService.findById(id);
        return ResultGenerator.genSuccessResult(pages);
    }

    @PostMapping("/listAll")
    public Result listAll() {
        List<Pages> list = pagesService.findAll();
        return ResultGenerator.genSuccessResult(list);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Pages> list = pagesService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //根据条件进行查找 ex => data : { id : 12 }
    @PostMapping("/listBy")
    public Result listBy(@RequestParam Map<String,String> cond, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        Condition condition = new Condition(Pages.class);
        Iterator<String> keys = cond.keySet().iterator();
        while (keys.hasNext()) {
            String k = keys.next();
            if (k.equals("page") || k.equals("size")) {
                continue;
            }
            condition.createCriteria().andEqualTo(k,cond.get(k));
        }
        PageHelper.startPage(page, size);
        List<Pages> list = pagesService.findByCondition(condition);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
