// src/pages/InstructorDashboard.js
import { useState, useEffect } from "react";
import axios from "../services/axios";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [message,setMessage] = useState("");
  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    const res = await axios.get("/courses", { headers:{Authorization:`Bearer ${token}`} });
    setCourses(res.data.filter(c=>c.instructor._id===JSON.parse(atob(token.split(".")[1])).id));
  };

  useEffect(()=>{ fetchCourses(); }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post("/courses", { title, description }, { headers:{Authorization:`Bearer ${token}`} });
      setMessage(res.data.message);
      setTitle(""); setDescription("");
      fetchCourses();
    } catch(err){ console.error(err); }
  };

  const handleAddModule = async (courseId, moduleTitle, moduleContent) => {
    try {
      await axios.post(`/courses/${courseId}/module`, { title:moduleTitle, content:moduleContent }, { headers:{Authorization:`Bearer ${token}`} });
      fetchCourses();
    } catch(err){ console.error(err); }
  };

  return (
    <div style={{maxWidth:"800px", margin:"50px auto"}}>
      <h2>Instructor Dashboard</h2>
      {message && <p style={{color:"green"}}>{message}</p>}

      <h3>Create Course</h3>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button onClick={handleCreate}>Create</button>

      <h3>Your Courses</h3>
      {courses.map(c=>(
        <div key={c._id} style={{border:"1px solid #ccc", padding:"15px", marginBottom:"20px"}}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>

          <h5>Add Module</h5>
          <input id={`modTitle-${c._id}`} placeholder="Module Title" />
          <input id={`modContent-${c._id}`} placeholder="Video URL" />
          <button onClick={()=>handleAddModule(c._id,
            document.getElementById(`modTitle-${c._id}`).value,
            document.getElementById(`modContent-${c._id}`).value
          )}>Add Module</button>

          <h5>Student Progress</h5>
          {c.progress.map(p=>(
            <div key={p.student}>
              Student: {p.student}, Completed: {p.completedModules.length}/{c.modules.length}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default InstructorDashboard;
