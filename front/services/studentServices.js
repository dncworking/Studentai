import API from "./api.js"; // Importuojame tavo turimą Axios/Fetch instanciją


// 1. Gauti visus studentus (grąžina response.data.data, kur guli masyvas)
export const getStudents = async () => {
  try {
    const response = await API.get("/students");
    return response.data.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko užkrauti studentų.",
      { cause: error },
    );
  }
};

// 2. Sukurti naują studentą
export const createStudent = async (studentData) => {
  try {
    const response = await API.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko pridėti naujo studento.",
      { cause: error },
    );
  }
};

// 3. Ištrinti studentą pagal ID
export const deleteStudent = async (id) => {
  try {
    const response = await API.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko ištrinti studento.",
      { cause: error },
    );
  }
};

// 4. Gauti vieną studentą pagal ID (redagavimo modalui ar formai užpildyti)
export const getStudentById = async (id) => {
  try {
    const response = await API.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko gauti studento duomenų.",
      { cause: error },
    );
  }
};

// 5. Atnaujinti studento duomenis (išsiųsti pakeitimus)
export const updateStudent = async (id, studentData) => {
  try {
    const response = await API.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko atnaujinti studento.",
      { cause: error },
    );
  }
};