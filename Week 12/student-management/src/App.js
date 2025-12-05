import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi fetch:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { name, age: Number(age), class: stuClass };

    if (editingId) {
      axios.put(`http://localhost:5000/api/students/${editingId}`, studentData)
        .then(res => {
          console.log("Đã cập nhật:", res.data);
          setStudents(prev => prev.map(s => s._id === editingId ? res.data : s));

          resetForm();
        })
        .catch(err => console.error("Lỗi cập nhật:", err));
    } else {
      axios.post('http://localhost:5000/api/students', studentData)
        .then(res => {
          console.log("Đã thêm:", res.data);
          setStudents(prev => [...prev, res.data]);
          resetForm();
        })
        .catch(err => console.error("Lỗi thêm:", err));
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setStuClass(student.class);
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setStuClass("");
    setEditingId(null);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Quản Lý Học Sinh</h1>

      <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
        <h3>{editingId ? "Chỉnh Sửa Thông Tin" : "Thêm Học Sinh Mới"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text" placeholder="Họ tên" value={name}
            onChange={e => setName(e.target.value)} required style={{ marginRight: "10px" }}
          />
          <input
            type="number" placeholder="Tuổi" value={age}
            onChange={e => setAge(e.target.value)} required style={{ marginRight: "10px" }}
          />
          <input
            type="text" placeholder="Lớp" value={stuClass}
            onChange={e => setStuClass(e.target.value)} required style={{ marginRight: "10px" }}
          />

          <button type="submit">{editingId ? "Cập Nhật" : "Thêm"}</button>

          {editingId && (
            <button type="button" onClick={resetForm} style={{ marginLeft: "10px", background: "grey" }}>
              Hủy
            </button>
          )}
        </form>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
              <td>
                <button onClick={() => startEdit(student)}>Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;