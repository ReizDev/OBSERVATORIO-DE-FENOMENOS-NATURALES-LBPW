using Microsoft.Data.SqlClient;

public class AuthService {
    private readonly string _connectionString;

    public AuthService(string connectionString) {
        _connectionString = connectionString;
    }

    public bool Registrar(string username, string password, string email) {
        string hash = BCrypt.Net.BCrypt.HashPassword(password);

        using (SqlConnection conn = new SqlConnection(_connectionString)) {
            conn.Open();
            string query = "INSERT INTO Usuarios (Username, PasswordHash, Email) VALUES (@u, @p, @e)";
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@u", username);
            cmd.Parameters.AddWithValue("@p", hash);
            cmd.Parameters.AddWithValue("@e", email);
            return cmd.ExecuteNonQuery() > 0;
        }
    }

    public bool Login(string username, string password) {
        using (SqlConnection conn = new SqlConnection(_connectionString)) {
            conn.Open();
            string query = "SELECT PasswordHash FROM Usuarios WHERE Username=@u";
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@u", username);

            var reader = cmd.ExecuteReader();
            if (reader.Read()) {
                string hash = reader.GetString(0);
                return BCrypt.Net.BCrypt.Verify(password, hash);
            }
            return false;
        }
    }
}
