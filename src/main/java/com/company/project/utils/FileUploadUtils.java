package com.company.project.utils;

import com.sun.tools.internal.ws.wsdl.document.Output;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

/**
 * Created by Administrator on 2017/9/16.
 */
public class FileUploadUtils {
    public static String filePath = "D:\\tmp";

    public static String saveFile(MultipartFile file) {
        String path = "";
        OutputStream os = null;
        InputStream inputStream = null;
        try {
            inputStream = file.getInputStream();
            //uuid
            path = filePath + "\\" + file.getOriginalFilename();
            byte[] bs = new byte[1024];
            int len;
            File tmpFile = new File(path);
            os = new FileOutputStream(path);
            while ((len = inputStream.read(bs)) != -1) {
                os.write(bs,0,len);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            path = "";
        } catch (IOException e) {
            path = "";
            e.printStackTrace();
        } finally {
            try {
                os.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                return path;
            }
        }
    }

    public String getSuffix(MultipartFile file) {
        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
    }
}
