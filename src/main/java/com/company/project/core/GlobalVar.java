package com.company.project.core;

import com.company.project.utils.ReadFile;
import org.apache.commons.codec.binary.Hex;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@ConfigurationProperties(prefix="globalval")
public class GlobalVar {
    private String AdminToken = UUID.randomUUID().toString();
    private String QuestionFile = "";
    private Map<String,String> loginUsers = new HashMap<>();  // token,uid
    private Map<String,String> loginUsersMap = new HashMap<>(); // uid,token
    private String LastQuestion = "";
    // 这里有一些问题，只有我才能知道答案
    private Map<String,String> adminQuestion = new HashMap<>(); // uid,token
    Random r = new Random();

    public String getQuestionFile() {
        return QuestionFile;
    }

    public void setQuestionFile(String questionFile) {
        QuestionFile = questionFile;
    }

    public boolean checkAdmin(String token) {
        return token.equals(AdminToken);
    }
    // 检查是否是本人操作自己的内容
    public boolean checkSelf(String token,String uid) {
        return uid.equals(loginUsers.get(token));
    }
    public boolean checkSelfOrAdmin(String token,String uid) {
        return checkAdmin(token) || checkSelf(token,uid);
    }
    public String getAdminToken() {
        return AdminToken;
    }

    public void setAdminToken(String adminToken) {
        AdminToken = adminToken;
    }

    public void addLoginUser(String token,String userid) {
        if (loginUsersMap.containsKey(userid)) {
            loginUsers.remove(loginUsersMap.get(userid));
            loginUsersMap.remove(token);
        }
        loginUsers.put(token,userid);
        loginUsersMap.put(userid,token);
    }
    public String getUserId(String token) {
        return loginUsers.get(token);
    }
    public String md5(String word) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("md2");
        return Hex.encodeHexString(md.digest(word.getBytes()));
    }
    public String getAdminQuestion() {
        InitAdminQuestion();
        if (adminQuestion.keySet().size() > 0) {
            Object[] keys = adminQuestion.keySet().toArray();
            LastQuestion = keys[r.nextInt(keys.length)].toString();
            return LastQuestion;
        } else {
            return "暂时没有问题";
        }
    }
    public void InitAdminQuestion() {
        File file = new File(QuestionFile);
        if(!file.exists()){
            // 文件不存在
            System.out.println("文件" + QuestionFile + "不存在");
        } else {
            adminQuestion.clear();
            ArrayList<String> lines = ReadFile.readFileByLines(QuestionFile);
            for (int i = 0;i < lines.size();i++) {
                String[] sps = lines.get(i).split("=");
                if (sps.length == 2) {
                    adminQuestion.put(sps[0],sps[1]);
                }
            }
        }
    }
    public boolean isQuestionRight(String question,String answer) throws NoSuchAlgorithmException {
        if (adminQuestion.containsKey(question) && LastQuestion.equals(question)) {
            return md5(answer).equals(adminQuestion.get(question));
        } else {
            return false;
        }
    }
}
