package com.company.project.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class AddMon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String words;

    private Integer index;

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
     * @return words
     */
    public String getWords() {
        return words;
    }

    /**
     * @param words
     */
    public void setWords(String words) {
        this.words = words;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}