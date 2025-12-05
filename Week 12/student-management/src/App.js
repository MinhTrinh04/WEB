import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = { name, age: Number(age), class: stuClass };

    axios.post('http://localhost:5000/api/students', newStudent)
      .then(res => {
        console.log("Đã thêm:", res.data);

        setStudents(prev => [...prev, res.data]);

        setName("");
        setAge("");
        setStuClass("");
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Quản Lý Học Sinh</h1>

      <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px" }}>
        <h3>Thêm Học Sinh Mới</h3>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Lớp"
            value={stuClass}
            onChange={e => setStuClass(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <button type="submit">Thêm</button>
        </form>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;