// frontend/src/pages/Auth.js
import { useState } from "react";
import axios from "../services/axios";

function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setMessage("Login successful!");
      } else {
        // REGISTER
        const res = await axios.post("http://localhost:5000/api/auth/register", form);
        setMessage(res.data.message || "Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <select name="role" value={form.role} onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px" }}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "15px", cursor: "pointer", color: "blue" }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default Auth;
