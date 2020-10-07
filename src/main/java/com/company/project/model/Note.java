package com.company.project.model;

import javax.persistence.*;

public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String ctime;

    private String note;

    private String nextid;

    private String other;

    private String uid;

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
     * @return ctime
     */
    public String getCtime() {
        return ctime;
    }

    /**
     * @param ctime
     */
    public void setCtime(String ctime) {
        this.ctime = ctime;
    }

    /**
     * @return note
     */
    public String getNote() {
        return note;
    }

    /**
     * @param note
     */
    public void setNote(String note) {
        this.note = note;
    }

    /**
     * @return nextid
     */
    public String getNextid() {
        return nextid;
    }

    /**
     * @param nextid
     */
    public void setNextid(String nextid) {
        this.nextid = nextid;
    }

    /**
     * @return other
     */
    public String getOther() {
        return other;
    }

    /**
     * @param other
     */
    public void setOther(String other) {
        this.other = other;
    }

    /**
     * @return uid
     */
    public String getUid() {
        return uid;
    }

    /**
     * @param uid
     */
    public void setUid(String uid) {
        this.uid = uid;
    }
}