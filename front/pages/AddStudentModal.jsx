import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { getSubjects } from "../services/subjectServices";
import styles from "../styles/AddStudentModal.module.css";

const AddStudentModal = ({ onClose, onSave }) => {
  const [subjects, setSubjects] = useState([]); // Dinaminis dalykų state
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Užkrauname tikruosius dalykus iš DB kai modalas atsidaro
  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const resData = await getSubjects();
        
        // Patikriname duomenų struktūrą, kad gautume tikrąjį masyvą
        if (resData && Array.isArray(resData.subjects)) {
          setSubjects(resData.subjects);
        } else if (Array.isArray(resData)) {
          setSubjects(resData);
        } else {
          setSubjects([]);
        }
      } catch (err) {
        setError("Nepavyko gauti dalykų iš duomenų bazės.");
        console.error(err);
      }
    };

    fetchSubjectsData();
  }, []);

  const onSubmit = (data) => {
    onSave({
      ...data,
      course: Number(data.course),
      subject_id: data.subject_id ? Number(data.subject_id) : null
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>Pridėti naują studentą</h3>
          <button onClick={onClose} className={styles.closeHeaderBtn}>
            <X size={18} />
          </button>
        </div>

        {error && <p className={styles.errorText} style={{ textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Vardas</label>
            <input
              type="text"
              {...register("first_name", { required: "Vardas privalomas" })}
              placeholder="Įveskite vardą..."
            />
            {errors.first_name && <span className={styles.errorText}>{errors.first_name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Pavardė</label>
            <input
              type="text"
              {...register("last_name", { required: "Pavardė privaloma" })}
              placeholder="Įveskite pavardę..."
            />
            {errors.last_name && <span className={styles.errorText}>{errors.last_name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label>Kursas</label>
            <select {...register("course", { required: "Pasirinkite kursą" })}>
              <option value="1">1 Kursas</option>
              <option value="2">2 Kursas</option>
              <option value="3">3 Kursas</option>
              <option value="4">4 Kursas</option>
            </select>
          </div>

          {/* 🌟 Dinaminis select laukas, užkraunamas iš duomenų bazės */}
          <div className={styles.inputGroup}>
            <label>Dalykas</label>
            <select {...register("subject_id")}>
              <option value="">-- Nepriskirta --</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name || sub.subject_name} 
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Atšaukti
            </button>
            <button type="submit" className={styles.saveBtn}>
              Pridėti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;