package com.bishi;

import java.util.Arrays;
import java.util.Scanner;

public class test {

    static class GuPiao implements Comparable<GuPiao> {
        private int X = 0;
        private int Y = 0;
        private float earn = 0;

        public int getX() {
            return X;
        }

        public int getE() {
            return Y - X;
        }

        public float getEarn() {
            return earn;
        }

        public GuPiao(int x, int y) {
            this.X = x;
            this.Y = y;
            this.earn = ((float) y - (float)x) / (float)x;
        }

        @Override
        public int compareTo(GuPiao o) {
            int ret = this.earn > o.getEarn() ? -1 : 1;
            return ret;
        }
    }

    public static void main(String []args) {
        Scanner input=new Scanner(System.in);
        int N = input.nextInt();
        int M = input.nextInt();
        int result = 0;
        int i = 0;
        int t = 0;
        GuPiao[] gp = new GuPiao[N];

        for (i = 0;i < N;i++) {
            int x = input.nextInt();
            int y = input.nextInt();
            gp[i] = new GuPiao(x,y);
        }
        Arrays.sort(gp);
        for (i = 0;i < N && M > 0;i++) {
            if (gp[i].earn > 0) {
                t = M / gp[i].getX();
                result += t * gp[i].getE();
                M -= t * gp[i].getX();
            } else {
                break;
            }
        }
        System.out.println(result);
    }
}
