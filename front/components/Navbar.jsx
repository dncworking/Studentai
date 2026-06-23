import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import styles from "../styles/Navbar.module.css";


const Navbar = ({ searchTerm, setSearchTerm, courseFilter, setCourseFilter, onAddClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h3>🎓 Studentai</h3>
      </div>

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Ieškoti pagal vardą/pavardę..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">Visi kursai</option>
          <option value="1">1 Kursas</option>
          <option value="2">2 Kursas</option>
          <option value="3">3 Kursas</option>
          <option value="4">4 Kursas</option>
        </select>
      </div>

      <div className={styles.navActions}>
        <button onClick={onAddClick} className={styles.addBtn} title="Pridėti studentą">
          <UserPlus size={16} /> Pridėti
        </button>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Atsijungti
        </button>
      </div>
    </nav>
  );
};

export default Navbar;