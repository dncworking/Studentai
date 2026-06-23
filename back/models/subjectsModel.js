import { sql } from "../config/db.js";

export const getAllSubjectsM = async () => {
  const data = await sql`
    SELECT * FROM subjects 
    ORDER BY id ASC`;
  return data;
};

export const getSubjectByIdM = async (id) => {
  const data = await sql`
    SELECT * FROM subjects 
    WHERE id = ${id}`;
  return data[0]; 
};

export const postSubjectM = async (subject) => {
  const { name, credits } = subject;

  const data = await sql`
    INSERT INTO subjects (name, credits) 
    VALUES (${name}, ${credits}) 
    RETURNING *`;
  return data[0];
};

export const updateSubjectM = async (id, subject) => {
  const { name, credits } = subject;

  const data = await sql`
    UPDATE subjects 
    SET name = ${name}, credits = ${credits} 
    WHERE id = ${id} 
    RETURNING *`;
  return data[0];
};

export const deleteSubjectM = async (id) => {
  const data = await sql`
    DELETE FROM subjects 
    WHERE id = ${id} 
    RETURNING *`;
  return data[0];
};