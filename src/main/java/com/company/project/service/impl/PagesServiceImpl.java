package com.company.project.service.impl;

import com.company.project.dao.PagesMapper;
import com.company.project.model.Pages;
import com.company.project.service.PagesService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/10/05.
 */
@Service
@Transactional
public class PagesServiceImpl extends AbstractService<Pages> implements PagesService {
    @Resource
    private PagesMapper pagesMapper;

}
