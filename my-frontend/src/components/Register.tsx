import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3005/api/users/register", {
        email: username,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" color="textPrimary">
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Submit
        </Button>
      </Typography>
    </Container>
  );
}

export default Register;
