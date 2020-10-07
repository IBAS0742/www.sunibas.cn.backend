package com.conpany.project;

import org.junit.Test;

import java.util.Date;
import java.util.UUID;

/**
 * Created by Administrator on 2017/8/2.
 */
public class TestUUid {
    @Test
    public void testOne() {
        System.out.println(UUID.randomUUID().toString());
    }

    @Test
    public void testTow() {
        Long a = 1L;
        System.out.println(a.toString());
    }

    @Test
    public void testThree() {
        Date d = new Date();
        System.out.println(d.getTime());
    }
}
