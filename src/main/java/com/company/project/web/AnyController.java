package com.company.project.web;

import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.AddMon;
import com.company.project.model.Mon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Created by Administrator on 2017/8/3.
 */
@RestController
@RequestMapping("/any")
public class AnyController {

    @GetMapping("str")
    @PostMapping("/str")
    public String add(String str) {
        return str;
    }

    @GetMapping("dely")
    public String dely() throws InterruptedException {
        Thread.sleep(1000 * 60 * 3);
        return "ok";
    }
}
