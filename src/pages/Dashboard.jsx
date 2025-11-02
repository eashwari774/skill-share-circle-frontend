import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchSessions();
    }
  }, []);

  const fetchSessions = async () => {
    const res = await axios.get("http://localhost:5000/api/sessions");
    setSessions(res.data);
  };

  const handleCreateSession = async () => {
    const title = prompt("Enter session title:");
    const description = prompt("Enter session description:");
    const date = prompt("Enter date (YYYY-MM-DD):");

    try {
      await axios.post(
        "http://localhost:5000/api/sessions/create",
        { title, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Session Created ✅");
      fetchSessions();
    } catch (err) {
      alert("Only teachers can create sessions ❌");
    }
  };

  const handleEnroll = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/sessions/enroll/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled Successfully ✅");
    } catch {
      alert("Only students can enroll ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard 🎓</h2>
      <p>Logged in as: <b>{role}</b></p>

      <button onClick={logout}>Logout</button>
      <br /><br />

      {role === "teacher" && (
        <button onClick={handleCreateSession}>
          ➕ Create New Session
        </button>
      )}

      <h3>Available Sessions</h3>

      {sessions.map((s) => (
        <div key={s._id} style={{ border: "1px solid #aaa", padding: 10, margin: 10 }}>
          <h4>{s.title}</h4>
          <p>{s.description}</p>
          <p><b>Date:</b> {s.date}</p>
          <p><b>Teacher:</b> {s.teacherId?.name}</p>

          {role === "student" && (
            <button onClick={() => handleEnroll(s._id)}>Enroll ✅</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

