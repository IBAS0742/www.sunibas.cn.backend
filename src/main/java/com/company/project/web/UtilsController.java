package com.company.project.web;

import com.company.project.core.GlobalVar;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/utils")
public class UtilsController {
    @Autowired
    private GlobalVar globalVar;

    @PostMapping("/md5")
    public Result md5(String str) throws NoSuchAlgorithmException {
        return ResultGenerator.genSuccessResult(globalVar.md5(str));
    }

    @PostMapping("/getAdminQuestion")
    public Result getAdminQuestion() {
        return ResultGenerator.genSuccessResult(globalVar.getAdminQuestion());
    }

    @PostMapping("/checkAdminQuestion")
    public Result checkAdminQuestion(String token,String question,String answer) throws NoSuchAlgorithmException {
        if (globalVar.getUserId(token) == null) {
            return ResultGenerator.genFailResult("请先登录");
        } else {
            if (globalVar.isQuestionRight(question,answer)) {
                globalVar.setAdminToken(token);
                return ResultGenerator.genSuccessResult("ok");
            } else {
                // 不管什么情况，只要对不上都错
                return ResultGenerator.genFailResult("错误");
            }
        }
    }

    @PostMapping("/isAdmin")
    public Result isAdmin(String token) {
        if (globalVar.checkAdmin(token)) {
            return ResultGenerator.genSuccessResult("");
        } else {
            return ResultGenerator.genFailResult("你不是管理员");
        }
    }
}
