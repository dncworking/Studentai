import  { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Students from "./Students.jsx";
import AddStudentModal from "./AddStudentModal.jsx"; 
import { createStudent } from "../services/studentServices.js"; // Importuojame sukūrimo servisą

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  
  // Būsena pridėjimo modalo atidarymui
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Šis triggeris privers Students komponentą atsinaujinti, kai pridėsime naują įrašą
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddStudent = async (newStudentData) => {
    try {
      await createStudent(newStudentData);
      setIsAddModalOpen(false); // Uždarome modalą
      setRefreshTrigger(prev => prev + 1); // Atnaujiname studentų sąrašą lentelėje
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        onAddClick={() => setIsAddModalOpen(true)} // Atidaro modalą
      />

      <div style={{ padding: "2rem" }}>
        {/* Paduodame refreshTrigger, kad lentelė žinotų, jog reikia persikrauti */}
        <Students searchTerm={searchTerm} courseFilter={courseFilter} key={refreshTrigger} />
      </div>

      {isAddModalOpen && (
        <AddStudentModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleAddStudent}
        />
      )}
    </>
  );
}

export default Main;