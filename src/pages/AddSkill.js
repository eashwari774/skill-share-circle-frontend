import React, { useState } from "react";
import axios from "axios";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills`,
        { title, description, category },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Skill added successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      setError("Failed to add skill. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Skill</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        ></textarea>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;

