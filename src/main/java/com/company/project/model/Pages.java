package com.company.project.model;

import javax.persistence.*;

public class Pages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}