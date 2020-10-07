import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class TestProperties {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        sb.append(System.getProperty("user.dir"));
        sb.append("\\src");
        sb.append("\\main");
        sb.append("\\resources");
        sb.append("\\application-dev.properties");

        Properties properties = new Properties();
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new FileReader(sb.toString()));
            properties.load(bufferedReader);
            bufferedReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(properties.getProperty("spring.datasource.url"));
    }
}
