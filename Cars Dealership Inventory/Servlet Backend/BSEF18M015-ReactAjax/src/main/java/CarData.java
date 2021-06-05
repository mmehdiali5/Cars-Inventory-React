import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.sql.*;


public class CarData extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException {
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        Connection conn=null;
        try {
            ArrayList<Car> cars = new ArrayList<Car>();
            Class.forName("com.mysql.jdbc.Driver");
            final String DB_URL = "jdbc:mysql://localhost:3306/carsdb?";
            final String DB_USER = "root";
            final String DB_PASSWORD = "";
            conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            String query = "Select * from `cars`";
            Statement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            while(rs.next()){
                int id=rs.getInt("id");
                String name=rs.getString("name");
                String company=rs.getString("company");
                cars.add(new Car(id,name,company));
            }
            Gson gson = new GsonBuilder().create();
            JsonArray jarray = gson.toJsonTree(cars).getAsJsonArray();
            JsonObject jsonObject = new JsonObject();
            jsonObject.add("data", jarray);
            res.setContentType("application/json;charset=UTF-8");
            ServletOutputStream out = res.getOutputStream();
            out.println(jsonObject.toString());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
