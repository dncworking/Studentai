import api from "./api";

export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects"); 
    return response.data.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko užkrauti dalykų sąrašo.",
      { cause: error },
    );
  }
};