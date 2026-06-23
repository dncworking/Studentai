import  { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authServices.js";
import styles from "../styles/Form.module.css"

const SignUpForm = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const data = await signup(formData);
      if (data.status === "success" || data) {
        navigate("/login");
      }
    } catch (error) {
      setServerError(error.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sukurti paskyrą</h2>
        <p className={styles.subtitle}>Prisijunkite prie studentų valdymo sistemos</p>


        {serverError && <div className={styles.errorAlert}>{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Vartotojo vardas</label>
            <input
              type="text"
              id="username"
              placeholder="pvz., vardas"
              {...register("username", { 
                required: "Vartotojo vardas yra privalomas",
                minLength: { value: 3, message: "Vardas turi būti bent 3 simbolių" }
              })}
            />
            {errors.username && <span className={styles.errorText}>{errors.username.message}</span>}
          </div>

  
          <div className={styles.inputGroup}>
            <label htmlFor="email">El. paštas</label>
            <input
              type="email"
              id="email"
              placeholder="vardas.pavarde@gmail.com"
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

     
          <div className={styles.inputGroup}>
            <label htmlFor="password">Slaptažodis</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", { 
                required: "Slaptažodis yra privalomas",
                minLength: { value: 8, message: "Slaptažodis turi būti bent 8 simbolių" }
              })}
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>

          <button type="submit" className={styles.submitButton} >
       Registruotis
          </button>
        </form>

        <p className={styles.footerText}>
          Jau turite paskyrą? <Link to="/login" className={styles.link}>Prisijunkite</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;