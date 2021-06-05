import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;

public class Update extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            int id=Integer.parseInt(request.getParameter("id").toString());
            String CarName = request.getParameter("updatedName");
            String company = request.getParameter("updatedCompany");
            final String DB_URL = "jdbc:mysql://localhost:3306/carsdb?";
            final String DB_USER = "root";
            final String DB_PASSWORD = "";
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            String query = "UPDATE `cars` SET name=?,company=? WHERE id=?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, CarName);
            stmt.setString(2, company);
            stmt.setInt(3,id);
            int result = stmt.executeUpdate();
            HttpSession session=request.getSession();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}

