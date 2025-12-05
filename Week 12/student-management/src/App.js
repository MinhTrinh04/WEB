import { useState, useEffect } from 'react';
import axios from 'axios'; // [cite: 74]
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Quản Lý Học Sinh</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>Chưa có học sinh nào</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;