package com.company.project.service;
import com.company.project.model.Question;
import com.company.project.core.Service;


/**
 * Created by CodeGenerator on 2022/01/30.
 */
public interface QuestionService extends Service<Question> {
    Question RandSelect();
}
