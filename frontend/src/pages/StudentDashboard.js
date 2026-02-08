// frontend/src/pages/StudentDashboard.js
import { useEffect, useState } from "react";
import axios from "../services/axios";
import ReactPlayer from "react-player";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const enroll = async (courseId) => {
    try {
      const res = await axios.post(`/courses/${courseId}/enroll`);
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setMessage(err.response?.data?.message || "Enroll failed");
    }
  };

  const completeModule = async (courseId, moduleId) => {
    try {
      const res = await axios.post(
        `/courses/${courseId}/modules/${moduleId}/complete`
      );
      setMessage(res.data.message);
      fetchCourses();
    } catch (err) {
      setMessage("Failed to complete module");
    }
  };

  const downloadCertificate = async (courseId) => {
    try {
      const res = await axios.get(
        `/certificates/${courseId}/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      a.click();
    } catch {
      alert("Complete all modules first");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Student Dashboard</h2>
      {message && <p>{message}</p>}

      {courses.map((course) => (
        <div key={course._id} style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          {!course.isEnrolled && (
            <button onClick={() => enroll(course._id)}>Enroll</button>
          )}

          {course.isEnrolled && (
            <>
              <h4>Modules</h4>
              {course.modules.map((m) => (
                <div key={m._id} style={{ marginBottom: 15 }}>
                  <b>{m.title}</b>
                  <ReactPlayer url={m.content} controls width="100%" />
                  {!m.completed && (
                    <button onClick={() => completeModule(course._id, m._id)}>
                      Mark Completed
                    </button>
                  )}
                </div>
              ))}

              <button onClick={() => downloadCertificate(course._id)}>
                Download Certificate
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
