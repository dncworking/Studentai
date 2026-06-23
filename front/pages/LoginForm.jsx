import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authServices.js";
import styles from "../styles/Form.module.css";

const Login = () => {
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError("");
  

    try {
      // Naudojame tavo funkciją! data čia jau yra { email, password }
      const resData = await login(data); 

      // Kadangi tavo servisas grąžina response.data, pasiimame tokeną
      if (resData.token) {
        localStorage.setItem("token", resData.token);
        navigate("/students");
      }
    } catch (err) {
      // Tavo servise išmestas throw new Error(errorMessage) pagaunamas čia
      setServerError(err.message);
    } 
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sveiki grįžę</h2>
        <p className={styles.subtitle}>Prisijunkite prie savo paskyros</p>

        {/* Backendo klaidų pranešimas */}
        {serverError && <div className={styles.errorAlert}>{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          {/* El. paštas */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">El. paštas</label>
            <input
              type="email"
              id="email"
              placeholder="admin@stud.lt"
              {...register("email", { 
                required: "El. paštas yra privalomas",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Neteisingas el. pašto formatas"
                }
              })}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>

          {/* Slaptažodis */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">Slaptažodis</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", { 
                required: "Slaptažodis yra privalomas"
              })}
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>

          <button type="submit" className={styles.submitButton} >
            Prisijungti
          </button>
        </form>

        <p className={styles.footerText}>
          Neturite paskyros? <Link to="/signup" className={styles.link}>Užsiregistruokite</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;