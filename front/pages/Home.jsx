
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Hero sekcija su gražiu antraštės dizainu */}
      <header className={styles.hero}>
        <h1 className={styles.title}>
          Studentų ir Akademinių Dalykų <span className={styles.highlight}>Valdymo Sistema</span>
        </h1>
        <p className={styles.subtitle}>
          Moderni, saugi ir efektyvi platforma, skirta studentų pažangai sekti, 
          akademiniams dalykams valdyti bei kreditų apskaitai vykdyti.
        </p>
      </header>

      {/* Kortelės, trumpai aprašančios sistemos galimybes */}
      <section className={styles.features}>
        <div className={styles.card}>
          <h3>🧑‍🎓 Studentų sekimas</h3>
          <p>Patogus studentų sąrašas, filtravimas pagal kursus ir greitas duomenų atnaujinimas.</p>
        </div>
        <div className={styles.card}>
          <h3>📚 Dalykų valdymas</h3>
          <p>Akademinių dalykų registras, susietas su kreditų skaičiumi ir studentų priskyrimu.</p>
        </div>
        <div className={styles.card}>
          <h3>🔐 Saugus priėjimas</h3>
          <p>Duomenys apsaugoti JWT žetonais. Prieiga suteikiama tik registruotiems vartotojams.</p>
        </div>
      </section>

      {/* Veiksmo mygtukai (Call to Action) */}
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.button} ${styles.loginButton}`}
          onClick={() => navigate("/login")}
        >
          Prisijungti
        </button>
        <button 
          className={`${styles.button} ${styles.registerButton}`}
          onClick={() => navigate("/signup")}
        >
          Sukurti paskyrą
        </button>
      </div>
    </div>
  );
};

export default Home;