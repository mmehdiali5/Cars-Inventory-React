import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;

public class Insert extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String CarName = request.getParameter("CarName");
            String company = request.getParameter("company");
            final String DB_URL = "jdbc:mysql://localhost:3306/carsdb?";
            final String DB_USER = "root";
            final String DB_PASSWORD = "";
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            String query = "Insert into `cars` (name,company)Values(?,?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, CarName);
            stmt.setString(2, company);
            int result = stmt.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
