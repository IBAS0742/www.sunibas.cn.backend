package com.company.project.model;

import javax.persistence.*;

public class Mon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String words;

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
}