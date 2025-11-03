import React, { useState } from "react";
import axios from "axios";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/skills`, {
        title,
        description
      });
      alert("Skill added successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Error adding skill");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};

export default AddSkill;


