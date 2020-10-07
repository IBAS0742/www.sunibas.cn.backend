package com.company.project.utils;

import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Created by Administrator on 2017/9/19.
 */
public class IteratorFileUtils {
    public static void Iterator(Object from,Object to) {
        Field[] fields = from.getClass().getDeclaredFields();
        try {
            for (Field field : fields) {
                //System.out.println(field.getName());
                char[] fieldName = field.getName().toCharArray();
                fieldName[0] -= 32;
                Method mfrom = from.getClass().getMethod("get" + String.valueOf(fieldName));
                if (field.getType().getName() == "org.springframework.web.multipart.MultipartFile") {
                    Method mto = to.getClass().getMethod("set" + String.valueOf(fieldName),String.class);
                    MultipartFile file = (MultipartFile) mfrom.invoke(from);
                    if (file != null && !file.getOriginalFilename().equals("")) {
                        mto.invoke(to,FileUploadUtils.saveFile((MultipartFile)file));
                    } else {
                        mto.invoke(to,"");
                    }
                } else {
                    Object o = mfrom.invoke(from);
                    if (o != null) {
                        Method mto = to.getClass().getMethod("set" + String.valueOf(fieldName),o.getClass());
                        mto.invoke(to,o);
                    }
                }
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
