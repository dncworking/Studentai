import { sql } from "../config/db.js";

export const getAllStudentsM = async (courseFilter) => {

  if (courseFilter) {
    const data = await sql`
      SELECT students.*, subjects.name AS subject_name, subjects.credits
      FROM students
      JOIN subjects ON students.subject_id = subjects.id
      WHERE students.course = ${courseFilter}
      ORDER BY students.id ASC`;
    return data;
  }

  const data = await sql`
    SELECT students.*, subjects.name AS subject_name, subjects.credits
    FROM students
    JOIN subjects ON students.subject_id = subjects.id
    ORDER BY students.id ASC`;
  return data;
};

export const getStudentByIdM = async (id) => {
  const data = await sql`
    SELECT * FROM students 
    WHERE id = ${id}`;
  return data[0];
};

export const postStudentM = async (student) => {
  const { first_name, last_name, course, subject_id } = student;

  const data = await sql`
    INSERT INTO students (first_name, last_name, course, subject_id) 
    VALUES (${first_name}, ${last_name}, ${course}, ${subject_id}) 
    RETURNING *`;
  return data[0];
};

export const updateStudentM = async (id, student) => {
  const { first_name, last_name, course, subject_id } = student;

  const data = await sql`
    UPDATE students 
    SET first_name = ${first_name}, last_name = ${last_name}, course = ${course}, subject_id = ${subject_id} 
    WHERE id = ${id} 
    RETURNING *`;
  return data[0];
};

export const deleteStudentM = async (id) => {
  const data = await sql`
    DELETE FROM students 
    WHERE id = ${id} 
    RETURNING *`;
  return data[0];
};