import { useState } from "react";
/*import { Editor } from "@tinymce/tinymce-react";*/
import styles from "./addBlog.module.css";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      const res = await fetch("http://localhost:5000/blog", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("Appointment Booked Successfully");
        const data = await res.json();
        navigate(`/`);
      } else {
        alert("Error adding blog");
      }
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Blog</h1>
      <form onSubmit={handleSubmit} e>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Please Write Time and Date Book appointment and mobile NO</label>

          <textarea name="content" id="appointmentDetails" value={content} onChange={(e) => setContent(e.target.value)}></textarea>

        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default AddBlog;
