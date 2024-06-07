import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/users/login",
        {
          email: username,
          password,
        },
        { withCredentials: true }
      );
      const statusCode = response.status;
      if (statusCode == 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/posts");
      }
    } catch (error) {
      alert("Invalid username or password");
      console.error("Error logging in:", error);
    }
  };



  function handleRegister() {
    navigate("/register");
  }

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
        
        <Button variant="contained" color="primary" onClick={handleLogin} style={{marginRight:"1em"}}>
          Login
        </Button>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>

 
      </Typography>
    </Container>
  );
}

export default Login;
