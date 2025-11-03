import { useState } from "react";
import axios from "axios";

function AddSkill() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://skill-share-qn92.onrender.com/api/skills/add", 
        { title, category, description, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Skill Added ✅");
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Skill</h2>
      <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
      <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />
      <textarea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
      <button type="submit">Add Skill</button>
    </form>
  );
}

export default AddSkill;
