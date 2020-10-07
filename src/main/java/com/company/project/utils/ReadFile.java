package com.company.project.utils;

import java.io.*;
import java.util.ArrayList;

public class ReadFile {
    public static ArrayList<String> readFileByLines(String fileName) {
        File file = new File(fileName);
        BufferedReader reader = null;
        ArrayList<String> lines = new ArrayList<>();
        try {
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            int line = 1;
            // 一次读入一行，直到读入null为文件结束
            while ((tempString = reader.readLine()) != null) {
                // 显示行号
                lines.add(tempString);
            }
            reader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                }
            }
            return lines;
        }
    }

}
