package com.company.project.web;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.Recording;
import com.company.project.service.RecordingService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.mybatis.mapper.entity.Condition;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
* Created by CodeGenerator on 2021/02/21.
*/
@RestController
@RequestMapping("/recording")
public class RecordingController {
    @Resource
    private RecordingService recordingService;

    @PostMapping("/add")
    public Result add(Recording recording) {
        recording.setId(UUID.randomUUID().toString());
        recordingService.save(recording);
        return ResultGenerator.genSuccessResult(recording);
    }

    @PostMapping("/delete")
    public Result delete(@RequestParam String id) {
        recordingService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(Recording recording) {
        recordingService.update(recording);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/detail")
    public Result detail(@RequestParam String id) {
        Recording recording = recordingService.findById(id);
        return ResultGenerator.genSuccessResult(recording);
    }

    @PostMapping("/list")
    public Result list(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        PageHelper.startPage(page, size);
        List<Recording> list = recordingService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //根据条件进行查找 ex => data : { id : 12 }
    @PostMapping("/listBy")
    public Result listBy(@RequestParam Map<String,String> cond, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "0") Integer size) {
        Condition condition = new Condition(Recording.class);
        Example.Criteria criteria = condition.createCriteria();
        Iterator<String> keys = cond.keySet().iterator();
        while (keys.hasNext()) {
            String k = keys.next();
            if (k.equals("page") || k.equals("size")) {
                continue;
            }
            criteria.andEqualTo(k,cond.get(k));
        }
        PageHelper.startPage(page, size);
        List<Recording> list = recordingService.findByCondition(condition);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
