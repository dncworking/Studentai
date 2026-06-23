import { useEffect, useState } from "react"; // Pridėtas useState dalykų saugojimui
import { useForm } from "react-hook-form";
import { X } from "lucide-react"; 
import styles from "../styles/EditStudentModal.module.css"; 
import { getSubjects } from "../services/subjectServices.js";

const EditStudentModal = ({ student, onClose, onSave }) => {
  const [subjects, setSubjects] = useState([]); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const resData = await getSubjects();
        
        if (resData && Array.isArray(resData.subjects)) {
          setSubjects(resData.subjects);
        } else if (Array.isArray(resData)) {
          setSubjects(resData);
        } else {
          setSubjects([]);
        }
      } catch (err) {
        console.error("Nepavyko užkrauti dalykų:", err);
      }
    };

    fetchSubjectsData();
  }, []);

  useEffect(() => {
    if (student) {
      setValue("first_name", student.first_name);
      setValue("last_name", student.last_name);
      setValue("course", student.course);
      setValue("subject_id", student.subject_id || "");
    }
  }, [student, setValue]);

  const onSubmit = (data) => {
    onSave(student.id, { 
      ...data, 
      course: Number(data.course),
      subject_id: data.subject_id ? Number(data.subject_id) : null 
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>Redaguoti studentą</h3>
          <button onClick={onClose} className={styles.closeHeaderBtn}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="first_name">Vardas</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name", { required: "Vardas yra privalomas" })}
            />
            {errors.first_name && <span className={styles.errorText}>{errors.first_name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="last_name">Pavardė</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name", { required: "Pavardė yra privaloma" })}
            />
            {errors.last_name && <span className={styles.errorText}>{errors.last_name.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="course">Kursas</label>
            <select
              id="course"
              {...register("course", { required: "Kursas yra privalomas" })}
            >
              <option value="1">1 Kursas</option>
              <option value="2">2 Kursas</option>
              <option value="3">3 Kursas</option>
              <option value="4">4 Kursas</option>
            </select>
            {errors.course && <span className={styles.errorText}>{errors.course.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject_id">Dalykas</label>
            <select id="subject_id" {...register("subject_id")}>
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
              Išsaugoti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;