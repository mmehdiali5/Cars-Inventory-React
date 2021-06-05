import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

public class Delete extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        try {
            int id=Integer.parseInt(request.getParameter("id").toString());
            Class.forName("com.mysql.jdbc.Driver");
            final String DB_URL = "jdbc:mysql://localhost:3306/carsdb?";
            final String DB_USER = "root";
            final String DB_PASSWORD = "";
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            String query = "DELETE FROM `cars` where id=?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, id);
            int result = stmt.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}

