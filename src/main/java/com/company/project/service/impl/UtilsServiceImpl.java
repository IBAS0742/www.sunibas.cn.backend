package com.company.project.service.impl;

import com.company.project.dao.UtilsMapper;
import com.company.project.model.Utils;
import com.company.project.service.UtilsService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2021/01/04.
 */
@Service
@Transactional
public class UtilsServiceImpl extends AbstractService<Utils> implements UtilsService {
    @Resource
    private UtilsMapper utilsMapper;

}
