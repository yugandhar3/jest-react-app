import axios from "axios";
import { useState } from "react";


const Login = () => {
  const [error, setError] = useState(false);
  console.log("error", error)
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/login");

      // Assuming the response contains a token or a specific message on successful login
      if (response.data) {
        username === "yugandhar@arokee.com" ? setMessage("Successfully login") : setError('Invalid credentials')
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "please wait" : "Login"}
        </button>
        {error && (<span data-testid="error">{error}</span>)}
        {message && (<span data-testid="success-message">{message}</span>)}
      </form>
    </div>
  );
};

export default Login;
