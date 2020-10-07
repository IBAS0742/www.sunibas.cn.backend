package com.company.project.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Administrator on 2017/8/3.
 */
@Controller
public class HomeController {
    @RequestMapping(value = "/apis", method = RequestMethod.GET)
    public String home() {
        return "redirect:swagger-ui.html";
    }
}
