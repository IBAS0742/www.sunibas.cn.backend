package com.company.project.model;

import javax.persistence.*;

public class Recording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String label;

    @Column(name = "content_1")
    private String content1;

    @Column(name = "content_2")
    private String content2;

    @Column(name = "content_3")
    private String content3;

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
     * @return label
     */
    public String getLabel() {
        return label;
    }

    /**
     * @param label
     */
    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * @return content_1
     */
    public String getContent1() {
        return content1;
    }

    /**
     * @param content1
     */
    public void setContent1(String content1) {
        this.content1 = content1;
    }

    /**
     * @return content_2
     */
    public String getContent2() {
        return content2;
    }

    /**
     * @param content2
     */
    public void setContent2(String content2) {
        this.content2 = content2;
    }

    /**
     * @return content_3
     */
    public String getContent3() {
        return content3;
    }

    /**
     * @param content3
     */
    public void setContent3(String content3) {
        this.content3 = content3;
    }
}