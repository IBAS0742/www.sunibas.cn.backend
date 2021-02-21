package com.company.project.web;
import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Note;
import com.company.project.model.Pages;
import com.company.project.service.NoteService;
import com.company.project.service.PagesService;
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
* Created by CodeGenerator on 2020/10/05.
*/
@RestController
@RequestMapping("/note")
public class NoteController {
    @Autowired
    private GlobalVar globalVar;
    @Resource
    private NoteService noteService;

    @PostMapping("/add")
    public Result add(Note note,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        note.setUid(uid);
        note.setId(UUID.randomUUID().toString());
        noteService.save(note);
        note.setUid("");
        return ResultGenerator.genSuccessResult(note);
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam String id,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        Condition condition = new Condition(Pages.class);
        condition.createCriteria().andEqualTo("uid",uid).andEqualTo("id",id);
        noteService.deleteByCondition(condition);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Note note,String token) {
        String uid = globalVar.getUserId(token);
        if (uid == null) {
            return ResultGenerator.genFailResult("请先登录");
        }
        noteService.update(note);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam String id) {
        Note note = noteService.findById(id);
        return ResultGenerator.genSuccessResult(note);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Note> list = noteService.findAll();
        for (int i = 0;i < list.size();i++) {
            list.get(i).setUid("");
        }
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //根据条件进行查找 ex => data : { id : 12 }
//    @PostMapping("/listBy")
//    public Result listBy(@RequestParam Map<String,String> cond, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
//        Condition condition = new Condition(Note.class);
//        Iterator<String> keys = cond.keySet().iterator();
//        while (keys.hasNext()) {
//            String k = keys.next();
//            if (k.equals("page") || k.equals("size")) {
//                continue;
//            }
//            condition.createCriteria().andEqualTo(k,cond.get(k));
//        }
//        PageHelper.startPage(page, size);
//        List<Note> list = noteService.findByCondition(condition);
//        PageInfo pageInfo = new PageInfo(list);
//        return ResultGenerator.genSuccessResult(pageInfo);
//    }
}
