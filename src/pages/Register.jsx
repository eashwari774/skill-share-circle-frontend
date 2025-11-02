import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://skill-share-qn92.onrender.com/api/auth/register", {
        name, email, password, role
      });

      alert("Registered Successfully ✅");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /><br/><br/>
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/><br/>

      <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select><br/><br/>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
