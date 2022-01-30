package com;

import com.company.project.utils.ReadFile;
import org.apache.commons.codec.binary.Hex;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.io.File;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

class Node
{
    int val;
    Node left;
    Node right;
    public  Node(int val)
    {
        this.val = val;
    }
}
public class test
{
    public static void main(String[] args) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance("md2");
        String s = "tcafIkdFI";
        System.out.println(Hex.encodeHexString(md.digest(s.getBytes())));
    }
}
