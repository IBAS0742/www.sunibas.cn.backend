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
    public Result add(PageToken pt) {
        if (!globalVar.checkAdmin(pt.getToken())) {
            return ResultGenerator.genFailResult("无权限");
        }
        Pages p = pt.getPages();
        p.setId(UUID.randomUUID().toString());
        pagesService.save(p);
        return ResultGenerator.genSuccessResult(p);
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
    public Result update(PageToken pt) {
        if (!globalVar.checkAdmin(pt.getToken())) {
            return ResultGenerator.genFailResult("无权限");
        }
        pagesService.update(pt.getPages());
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
class PageToken {
    String token;
    private String id;

    private String path;

    private String filenam;

    private String description;
    private String image;
    private String tags;
    private String type;
    private String title;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return path
     */
    public String getPath() {
        return path;
    }

    /**
     * @param path
     */
    public void setPath(String path) {
        this.path = path;
    }

    /**
     * @return filenam
     */
    public String getFilenam() {
        return filenam;
    }

    /**
     * @param filenam
     */
    public void setFilenam(String filenam) {
        this.filenam = filenam;
    }

    /**
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTags() {
        return tags;
    }

    public String getType() {
        return type;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public Pages getPages() {
        Pages p = new Pages();
        p.setId(this.id);
        p.setDescription(this.description);
        p.setFilenam(this.filenam);
        p.setPath(this.path);
        p.setImage(this.image);
        p.setTags(this.tags);
        p.setTitle(this.title);
        p.setType(this.type);
        return p;
    }
}