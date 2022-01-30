package com.company.project.web;
import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Note;
import com.company.project.model.Pages;
import com.company.project.service.NoteService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
//import io.swagger.annotations.Scope;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.*;

/**
* Created by CodeGenerator on 2020/10/05.
*/
@Scope("session")
@RestController
@RequestMapping("/api")
public class ApiController {
    private Map<String,String> map;// = new HashMap<>();
    private List<String> list;// = new ArrayList<>();
    @PostConstruct
    public void init(){
        list = new ArrayList<String>();
        map = new HashMap<>();
    }

    @GetMapping("/returnGet")
    @PostMapping("/returnGet")
    public Result returnGet(String any) {
        return ResultGenerator.genSuccessResult(any);
    }

    @GetMapping("/getOrSave")
    @PostMapping("/getOrSave")
    public Result getOrSave(String key,String value) {
        if ("".equals(value) || null == value) {
            return ResultGenerator.genSuccessResult(map.get(key));
        }
        if (map.containsKey(key)) {
            map.put(key,value);
        } else {
            if (map.size() > 10) {
                map.remove(list.get(0));
                list.remove(0);
            }
            list.add(key);
            map.put(key,value);
        }
        return getOrSave(key,"");
    }
}
