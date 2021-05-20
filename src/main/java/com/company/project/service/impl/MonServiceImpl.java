package com.company.project.service.impl;

import com.company.project.dao.MonMapper;
import com.company.project.model.Mon;
import com.company.project.service.MonService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2021/05/20.
 */
@Service
@Transactional
public class MonServiceImpl extends AbstractService<Mon> implements MonService {
    @Resource
    private MonMapper monMapper;

}
