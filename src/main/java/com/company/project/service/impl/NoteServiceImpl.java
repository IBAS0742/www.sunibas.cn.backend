package com.company.project.service.impl;

import com.company.project.dao.NoteMapper;
import com.company.project.model.Note;
import com.company.project.service.NoteService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * Created by CodeGenerator on 2020/10/05.
 */
@Service
@Transactional
public class NoteServiceImpl extends AbstractService<Note> implements NoteService {
    @Resource
    private NoteMapper noteMapper;

}
