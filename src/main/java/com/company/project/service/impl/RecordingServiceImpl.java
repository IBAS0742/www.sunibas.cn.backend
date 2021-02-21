package com.company.project.service.impl;

import com.company.project.dao.RecordingMapper;
import com.company.project.model.Recording;
import com.company.project.service.RecordingService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2021/02/21.
 */
@Service
@Transactional
public class RecordingServiceImpl extends AbstractService<Recording> implements RecordingService {
    @Resource
    private RecordingMapper recordingMapper;

}
