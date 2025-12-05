import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi fetch:", error));
  }, []);

  const getProcessedList = () => {
    let result = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      if (a.name < b.name) return sortAsc ? -1 : 1;
      if (a.name > b.name) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  };

  const processedStudents = getProcessedList();

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa học sinh này không?")) {
      axios.delete(`http://localhost:5000/api/students/${id}`)
        .then(res => {
          setStudents(prev => prev.filter(s => s._id !== id));
        })
        .catch(err => console.error("Lỗi xóa:", err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { name, age: Number(age), class: stuClass };

    if (editingId) {
      axios.put(`http://localhost:5000/api/students/${editingId}`, studentData)
        .then(res => {
          setStudents(prev => prev.map(s => s._id === editingId ? res.data : s));
          resetForm();
        })
        .catch(err => console.error("Lỗi cập nhật:", err));
    } else {
      axios.post('http://localhost:5000/api/students', studentData)
        .then(res => {
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
    <div className="App" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Quản Lý Học Sinh</h1>

      <div style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
        <h3>{editingId ? "Chỉnh Sửa Thông Tin" : "Thêm Học Sinh Mới"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} required style={{ marginRight: "10px" }} />
          <input type="number" placeholder="Tuổi" value={age} onChange={e => setAge(e.target.value)} required style={{ marginRight: "10px", width: "60px" }} />
          <input type="text" placeholder="Lớp" value={stuClass} onChange={e => setStuClass(e.target.value)} required style={{ marginRight: "10px", width: "80px" }} />
          <button type="submit">{editingId ? "Cập Nhật" : "Thêm"}</button>
          {editingId && <button type="button" onClick={resetForm} style={{ marginLeft: "10px", background: "grey", color: "white" }}>Hủy</button>}
        </form>
      </div>

      <div style={{ marginBottom: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />

        <button onClick={() => setSortAsc(prev => !prev)} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Sắp xếp: {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>Họ Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {processedStudents.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>Không tìm thấy học sinh nào</td>
            </tr>
          ) : (
            processedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => startEdit(student)} style={{ marginRight: "5px", cursor: "pointer" }}>Sửa</button>
                  <button onClick={() => handleDelete(student._id)} style={{ background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px" }}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;