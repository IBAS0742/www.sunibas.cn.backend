package com.bishi;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.util.Random;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class testHandle {
    public static void main(String[] args) throws Throwable {
        TestHandleEx the = new TestHandleEx();
        // 句柄做法
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodType type = MethodType.methodType(int.class,String.class);
        MethodHandle mh = lookup.findVirtual(TestHandleEx.class,"getRnd",type);
        // 2.再通过invokeExact来进行调用。
        System.out.println((int)mh.invokeExact(the,"name"));
        try {
            System.out.println((int)mh.invokeExact(the));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        mh = lookup.findVirtual(TestHandleEx.class,"getRnd1",type);
        System.out.println((int)mh.invokeExact(the,"name"));
        ////////////////////////////////////////////////////////
        // 反射
        Class<?> t = Class.forName("com.bishi.testHandle$TestHandleEx");
        Method m = t.getMethod("getRnd");
        System.out.println(m.invoke(t.newInstance()));
        try {
            System.out.println(m.invoke(t.newInstance(),"hahah"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    public static class TestHandleEx {
        public int getRnd(String str) {
            Random r = new Random();
            return r.nextInt(str.length());
        }
        public int getRnd() {
            Random r = new Random();
            return r.nextInt(10);
        }
        public int getRnd1(String str) {
            Random r = new Random();
            return r.nextInt(str.length());
        }
    }
}
