import { useState, useEffect } from "react";
import { getStudents, updateStudent, deleteStudent } from "../services/studentServices.js"; // <-- Įtraukti nauji servisai
import EditStudentModal from "./EditStudentModal.jsx"; // <-- Importuojame modalą
import { Edit, Trash2 } from "lucide-react"; // <-- Importuojame ikonas
import styles from "../styles/Students.module.css";

const Students = ({ searchTerm, courseFilter }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Būsena, skirta saugoti studentą, kurį dabar redaguojame
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const resData = await getStudents();
        if (resData && Array.isArray(resData.students)) {
          setStudents(resData.students);
        } else if (Array.isArray(resData)) {
          setStudents(resData);
        } else {
          setStudents([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  // 🛠️ 1. REDAGAVIMO IŠSAUGOJIMAS
  const handleSaveStudent = async (id, updatedData) => {
    try {
      await updateStudent(id, updatedData);
      
      // Atnaujiname būseną vietoje, kad nereikėtų perkrauti puslapio
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
      );
      setEditingStudent(null); // Uždarome modalą
    } catch (err) {
      alert(err.message);
    }
  };

  // 🗑️ 2. TRYNIMO LOGIKA
  const handleDelete = async (id, name, lastName) => {
    if (window.confirm(`Ar tikrai norite ištrinti studentą ${name} ${lastName}?`)) {
      try {
        await deleteStudent(id);
        
        // Pašaliname ištrintą studentą iš ekrano būsenos
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    const firstName = student.first_name || "";
    const lastName = student.last_name || "";
    
    const matchesSearch =
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === "" || student.course === Number(courseFilter);

    return matchesSearch && matchesCourse;
  });

  if (loading) return <p className={styles.message}>Kraunami studentai...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Studentų Sąrašas</h2>

      {filteredStudents.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>Kursas</th>
                <th>Dalykas</th>
                <th style={{ textAlign: "center" }}>Veiksmai</th> {/* <-- Naujas stulpelis */}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.course} kurse</td>
                  <td>{student.subject_name || "Nepriskirta"}</td>
                  <td>
                    {/* 🎛️ Veiksmų mygtukų konteineris */}
                    <div className={styles.actionsCell}>
                      <button
                        onClick={() => setEditingStudent(student)}
                        className={styles.editBtn}
                        title="Redaguoti"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.first_name, student.last_name)}
                        className={styles.deleteBtn}
                        title="Ištrinti"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.message}>Studentų pagal nurodytus filtrus nerasta.</p>
      )}

      {/* Jei paspaustas redagavimas, atidarome langą */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default Students;