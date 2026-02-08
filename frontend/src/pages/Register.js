import { useState } from "react";
import axios from "../services/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button type="submit" style={{ width: "100%", padding: "8px", marginTop: "10px" }}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
