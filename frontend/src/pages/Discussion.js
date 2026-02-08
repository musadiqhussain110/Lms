// src/pages/Discussion.js
import { useState, useEffect } from "react";
import axios from "../services/axios";

function Discussion({courseId}) {
  const [messages,setMessages] = useState([]);
  const [msg,setMsg] = useState("");
  const token = localStorage.getItem("token");

  const fetchMessages = async ()=>{
    const res = await axios.get(`/discussions/${courseId}`, { headers:{Authorization:`Bearer ${token}`} });
    setMessages(res.data);
  };

  useEffect(()=>{ fetchMessages(); },[]);

  const sendMessage = async ()=>{
    await axios.post(`/discussions/${courseId}`, { message: msg }, { headers:{Authorization:`Bearer ${token}`} });
    setMsg(""); fetchMessages();
  };

  return (
    <div>
      <h3>Discussion</h3>
      <div style={{border:"1px solid #ccc", padding:"10px", maxHeight:"300px", overflowY:"scroll"}}>
        {messages.map((m,i)=><p key={i}><b>{m.student.name}</b>: {m.message}</p>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Discussion;
